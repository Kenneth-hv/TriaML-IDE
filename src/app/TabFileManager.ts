// Copyright 2021 Tecnológico de Costa Rica
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import TabFile from "./TabFile";
import { remote } from "electron";
import { Tool } from "./TriaML";

export default class TabFileManager {
    private _tabFiles: TabFile[] = [];
    private _selectedIndex: number = -1;

    private readonly _fileFormat = [{
        name: "Triangle Source File",
        extensions: ["tri"]
    }];

    constructor() { }

    get tabFiles(): TabFile[] {
        return this._tabFiles;
    }

    get selectedIndex(): number {
        return this._selectedIndex
    }

    set selectedIndex(index: number) {
        this._selectedIndex = index;
    }

    public getTabFileIndex(tabFileId: number): number {
        for (let index = 0; index < this._tabFiles.length; index++) {
            const tabFile = this._tabFiles[index];
            if (tabFile.id == tabFileId) {
                return index;
            }
        }

        return -1;
    }

    public newTabFile() {
        this._tabFiles.push(new TabFile());
        this._selectedIndex = this._tabFiles.length - 1;
    }

    public openTab(): boolean {
        const selectedFile = remote.dialog.showOpenDialogSync(remote.getCurrentWindow(), { filters: this._fileFormat, properties: ['openFile'] });
        if (selectedFile) {
            // Prefer '/' over '\'
            const fileLocation = selectedFile[0].replaceAll('\\', '/');

            let existsAt = -1;
            // Check if file is already open
            this._tabFiles.forEach((tabFile, index) => {
                if (tabFile.filePath == fileLocation) {
                    existsAt = index;
                }
            });

            // If it's open switch to
            if (existsAt > -1) {
                this._selectedIndex = existsAt;
            } else {
                this._tabFiles.push(new TabFile(fileLocation));
                this._selectedIndex = this._tabFiles.length - 1;
            }
            return true;
        }
        return false;
    }

    public saveCurrentTab(saveAs?: boolean): boolean {
        return this.saveTab(this._selectedIndex, saveAs);
    }

    public saveCurrentTabAs() {
        return this.saveCurrentTab(true);
    }

    public saveTab(tabFileIndex: number, saveAs?: boolean): boolean {
        const tabFile = this._tabFiles[tabFileIndex];
        if (saveAs || !tabFile.filePath) {
            const selectedFile = remote.dialog.showSaveDialogSync(remote.getCurrentWindow(), { filters: this._fileFormat, properties: ['showOverwriteConfirmation'] });
            if (selectedFile) {
                // Prefer '/' over '\'
                tabFile.filePath = selectedFile.replaceAll('\\', '/');
                tabFile.saveFileContent();
                return true;
            }
        } else {
            tabFile.saveFileContent();
            return true;
        }
        return false;
    }

    public closeTab(tabFileId: number) {
        const tabFileIndex = this.getTabFileIndex(tabFileId);
        const tabFile = this._tabFiles[tabFileIndex];

        // If file is not saved promt the 'File not save' dialog
        if (!tabFile.isSaved) {
            const savePromptResult = remote.dialog.showMessageBoxSync(
                remote.getCurrentWindow(),
                {
                    message: "File not saved",
                    detail: "Would you like to save " + tabFile.fileName + "?",
                    type: "warning",
                    buttons: ["Save", "Don't Save", "Cancel"],
                    defaultId: 0,
                    cancelId: 2,
                    noLink: true
                }
            );

            if (savePromptResult == 0) {
                this.saveTab(tabFileIndex);
                if (!tabFile.isSaved) {
                    return false;
                }
            }

            if (savePromptResult == 2) {
                return false;
            }
        }
        this.disposeTab(tabFileIndex);
        return true;
    }

    public closeAllTabs(): boolean {
        // While there is tabs on tabFiles
        while (this._tabFiles.length > 0) {
            if (!this.closeTab(this._tabFiles[0].id)) return false;
        }
        return true;
    }

    private disposeTab(index: number) {
        this._tabFiles.splice(index, 1);
        if (index <= this._selectedIndex) {
            this._selectedIndex--;
            if (this._tabFiles.length > 0 && this._selectedIndex == -1) {
                this._selectedIndex = 0;
            }
        }
    }

    public compile(): boolean {
        if (this._selectedIndex > -1) {
            if (this.saveCurrentTab()) {
                const tabFile = this._tabFiles[this._selectedIndex];
                return tabFile.compile();
            }
        }
        return false;
    }

    public run(): boolean {
        if (this._selectedIndex > -1) {
            const tabFile = this._tabFiles[this._selectedIndex];
            return tabFile.run();
        }
        return false;
    }

    public updateTool(tool: Tool) {
        if (this._selectedIndex > -1) {
            const tabFile = this._tabFiles[this._selectedIndex];
            switch (tool) {
                case Tool.DISASSEMBLER:
                    tabFile.loadTAMCode();
                    break;
                case Tool.AST:
                    tabFile.loadAST();
                    break;
                case Tool.TABLE:
                    tabFile.loadTable();
                    break;
                case Tool.ERROR:
                    tabFile.loadErrors();
                    break;
                default:
                    break;
            }
        }
    }

}
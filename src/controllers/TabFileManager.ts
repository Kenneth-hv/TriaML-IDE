import TabFile from "./TabFile";
import { remote } from "electron";

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
        for (let index = 0; index < this._tabFiles.length; index++){
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

    public saveCurrentTab(saveAs?: boolean) {
        this.saveTab(this._tabFiles[this._selectedIndex].id, saveAs);
    }

    public saveCurrentTabAs() {
        this.saveCurrentTab(true);
    }

    public saveTab(tabFileId: number, saveAs?: boolean) {
        if (tabFileId && tabFileId > -1) {
            const tabFile = this._tabFiles[this._selectedIndex];
            if (saveAs || !tabFile.filePath) {
                const selectedFile = remote.dialog.showSaveDialogSync(remote.getCurrentWindow(), { filters: this._fileFormat, properties: ['showOverwriteConfirmation'] });
                if (selectedFile) {
                    tabFile.filePath = selectedFile;
                    tabFile.saveFileContent();
                }
            } else {
                tabFile.saveFileContent();
            }
        }
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
                this.saveTab(tabFileId);
                if (!tabFile.isSaved) {
                    return;
                }
            }

            if (savePromptResult == 2) {
                return;
            }
        }
        this.disposeTab(tabFileIndex);
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

    public compile() {
        if (this._selectedIndex > -1) {
            const tab = this._tabFiles[this._selectedIndex];
            tab.compile();
        }
    }

    public run() {
        if (this._selectedIndex > -1) {
            const tab = this._tabFiles[this._selectedIndex];
            tab.run();
        }
    }

}
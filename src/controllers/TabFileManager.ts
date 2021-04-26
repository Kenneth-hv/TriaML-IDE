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

    public newTabFile() {
        this._tabFiles.push(new TabFile());
        this._selectedIndex = this._tabFiles.length - 1;
    }

    public openTab() {
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
        }
    }

    public saveCurrentTab(saveAs?: boolean) {
        if (this._selectedIndex > -1) {
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

    public saveCurrentTabAs() {
        this.saveCurrentTab(true);
    }

    public closeTab(tabFileId: number) {
        this._tabFiles.forEach((tabFile, index) => {
            if (tabFile.id == tabFileId) {
                tabFile.close();
                this._tabFiles.splice(index, 1);
                if (index <= this._selectedIndex) {
                    this._selectedIndex--;
                    if (this._tabFiles.length > 0 && this._selectedIndex == -1) {
                        this._selectedIndex = 0;
                    }
                }
                return;
            }
        });
    }

    // NOT FINISHED
    public compile() {
        if (this._selectedIndex > -1) {
            const tab = this._tabFiles[this._selectedIndex];
            tab.compile();
        }
    }

}
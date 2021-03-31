import Tab from "./Tab";
import { remote } from "electron";

export default class TabManager {
    tabs: Tab[] = [];
    selectedIndex: number = -1;
    title: string = "TriaML";
    readonly fileFormat = [{
        name: "Triangle Source File",
        extensions: ["tri"]
    }];
    constructor() { }

    newTab() {
        this.tabs.push(new Tab());
        this.selectedIndex = this.tabs.length - 1;
    }

    openTab() {
        const selectedFile = remote.dialog.showOpenDialogSync(remote.getCurrentWindow(), { filters: this.fileFormat, properties: ['openFile'] });
        if (selectedFile){
            let existsAt = -1;
            
            this.tabs.forEach((tab, index) => {
                if(tab.fileLocation == selectedFile[0]) {
                    existsAt = index;
                }
            });

            if (existsAt > -1) {
                this.selectedIndex = existsAt;
            } else {
                this.tabs.push(new Tab(selectedFile[0]));
                this.selectedIndex = this.tabs.length - 1;
            }
        }
    }

    saveCurrentTab(saveAs?: boolean) {
        if (this.selectedIndex > -1) {
            const tab = this.tabs[this.selectedIndex];
            if (saveAs || tab.fileLocation == "") {
                const selectedFile = remote.dialog.showSaveDialogSync(remote.getCurrentWindow(), { filters: this.fileFormat, properties: ['showOverwriteConfirmation'] });
                if (selectedFile){
                    tab.fileLocation = selectedFile;
                    tab.saveFileContent();
                }
            } else {
                tab.saveFileContent();
            }
        }
    }

    saveCurrentTabAs() {
        this.saveCurrentTab(true);
    }

    closeTab() {
        this.tabs.splice(this.selectedIndex, 1);
        this.selectedIndex = Math.min(this.selectedIndex, this.tabs.length - 1);
    }

    getSelectedIndex(): number {
        return this.selectedIndex
    }

    setSelectedIndex(index: number) {
        this.selectedIndex = index;
    }
}
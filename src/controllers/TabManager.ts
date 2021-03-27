import Tab from "./Tab";

export default class TabManager {
    tabs: Tab[] = [];
    selectedIndex: number = -1;
    constructor() { }

    openTab(fileLocation: string) {
        this.tabs.push(new Tab(fileLocation));
    }

    newTab() {
        this.tabs.push(new Tab());
        this.selectedIndex = this.tabs.length - 1;
    }

    saveFile(fileLocation: string) {
        this.tabs.forEach(element => {
            if (element.fileLocation == fileLocation)
                element.saveFileContent();
        });
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
import Tab from "./Tab";

export default class TabManager {
    tabs: Tab[] = [];
    constructor () {}

    openTab(fileLocation: string) {
        this.tabs.push(new Tab(fileLocation));
    }

    newTab(){
        this.tabs.push(new Tab());
    }

    saveFile(fileLocation: string){
        this.tabs.forEach(element => {
            if (element.fileLocation == fileLocation)
                element.saveFileContent();               
        });
    }

    closeTab(fileLocation: string) {
        this.tabs.forEach((element, index) => {
            if (element.fileLocation == fileLocation)
                delete this.tabs[index];
        });
    }
}
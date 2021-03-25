import { Tab } from "./Tab";

export class TabManager {
    openTabs: Tab[] = [];
    constructor () {}

    openTab(fileLocation: string) {
        this.openTabs.push(new Tab(fileLocation));
    }

    newTab(){
        this.openTabs.push(new Tab());
    }

    saveFile(fileLocation: string){
        this.openTabs.forEach(element => {
            if (element.fileLocation == fileLocation)
                element.saveFileContent();               
        });
    }

    closeTab(fileLocation: string) {
        this.openTabs.forEach((element, index) => {
            if (element.fileLocation == fileLocation)
                delete this.openTabs[index];
        });
    }
}
import FileManager from "./FileManager";

export default class Tab {
    private static idcount: number = 0;
    fileLocation: string;
    fileContent: string;
    isSaved: boolean;
    readonly id: number = Tab.idcount++;

    constructor(fileLocation?: string) {
        if (fileLocation) {
            this.fileContent = FileManager.openFile(fileLocation);
            this.isSaved = true;
            this.fileLocation = fileLocation;
        } else {
            this.isSaved = false;
            this.fileContent = "";
            this.fileLocation = "";
        }
    }

    //Puede no ser necesario//
    updateFileContent(fileContent: string) {
        this.fileContent = fileContent;
        this.isSaved = false;
    }

    saveFileContent() {
        FileManager.saveFile(this.fileLocation, this.fileContent);
        this.isSaved = true;
    }

    getFileName(): string {
        if (this.fileLocation == "") {
            return "New File"
        } else {
            return this.fileLocation.substr(this.fileLocation.lastIndexOf('\\') + 1);
        }
    }
}
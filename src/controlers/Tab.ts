import FileManager from "./FileManager";

export default class Tab {
    fileLocation: string;
    fileContent: string;
    isSaved: boolean;

    constructor (fileLocation?: string) {
        if (fileLocation) {
            this.fileContent = FileManager.openFile(fileLocation);
            this.isSaved = true;
            this.fileLocation = fileLocation;
        }else{
            this.isSaved = false;
            this.fileContent = "";
            this.fileLocation = "";
        }
    }
    
    //Puede no ser necesario//
    updateFileContent (fileContent: string) {
        this.fileContent = fileContent;
        this.isSaved = false;
    }

    saveFileContent () {
        FileManager.saveFile(this.fileLocation, this.fileContent);
        this.isSaved = true;
    }
}
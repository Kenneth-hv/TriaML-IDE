import { ipcRenderer } from "electron";
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
        ipcRenderer.send("TERMINAL_INIT", this.id);
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
            const fileName = this.fileLocation;
            return fileName.substr(Math.max(fileName.lastIndexOf('/'), fileName.lastIndexOf('\\')) + 1);
        }
    }

    compile() {
        const triDir = 'C:/Compile/Triangle.exe'
        let command = triDir + " " + this.fileLocation;

        if (process.platform == "win32"){
            command = 'cd "C:/OCaml64/bin/" && bash --login -c "' + command + '"'
        }

        ipcRenderer.send("TERMINAL_INPUT", command + "\r", this.id);
    }

    close () {
        ipcRenderer.send("TERMINAL_KILL", this.id);
    }
}
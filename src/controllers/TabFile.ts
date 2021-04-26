import { ipcRenderer } from "electron";
import FileManager from "./FileManager";
import TerminalProcess from "./TerminalProcess";
import TerminalCommands from "./TerminalCommands"

export default class TabFile {
    private static _idcount: number = 0;
    private readonly _id: number = TabFile._idcount++;
    private _filePath: string;
    private _fileContent: string;
    private _isSaved: boolean;
    private _terminalProcess: TerminalProcess;

    constructor(fileLocation?: string) {
        if (fileLocation) {
            this._fileContent = FileManager.openFile(fileLocation);
            this._isSaved = true;
            this._filePath = fileLocation;
        } else {
            this._isSaved = false;
            this._fileContent = "";
            this._filePath = "";
        }
        this._terminalProcess = new TerminalProcess(this._id);
    }

    get id(): number {
        return this._id;
    }

    set fileContent(fileContent: string) {
        this._fileContent = fileContent;
        this._isSaved = false;
    }

    get fileContent() {
        return this._fileContent;
    }

    get fileName(): string {
        if (this._filePath == "") {
            return "New File"
        } else {
            const fileName = this._filePath;
            return fileName.substr(fileName.lastIndexOf('/') + 1);
        }
    }

    get fileFolderPath(): string {
        if (this._filePath == "") {
            return ""
        } else {
            const fileName = this._filePath;
            return fileName.substr(0, fileName.lastIndexOf('/'));
        }
    }

    get filePath(): string {
        return this._filePath;
    }

    set filePath(path: string) {
        this._filePath = path;
    }

    get isSaved(): boolean {
        return this._isSaved;
    }

    get terminalProcess(): TerminalProcess {
        return this._terminalProcess;
    }

    public saveFileContent() {
        FileManager.saveFile(this._filePath, this._fileContent);
        this._isSaved = true;
    }

    public compile() {
        this._terminalProcess.sendCommand(TerminalCommands.compile(this.fileFolderPath, this._filePath));
    }

    public disassemble() {
        this._terminalProcess.sendCommand(TerminalCommands.disassemble(this.fileFolderPath));
    }

    public run() {
        this._terminalProcess.sendCommand(TerminalCommands.run(this._filePath));
    }

    public close() {
        this._terminalProcess.kill();
    }
}
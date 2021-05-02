import FileManager from "./FileManager";
import TerminalProcess from "./TerminalProcess";
import TerminalCommands from "./TerminalCommands"
import convert from "xml-js"

export default class TabFile {
    private static _idcount: number = 0;
    private readonly _id: number = TabFile._idcount++;
    private _filePath: string;
    private _fileContent: string;
    private _isSaved: boolean;
    private _isCompiled: boolean;
    private _terminalProcess: TerminalProcess;
    public ast = {};

    constructor(fileLocation?: string) {
        if (fileLocation) {
            this._fileContent = FileManager.openFile(fileLocation);
            this._filePath = fileLocation;
        } else {
            this._fileContent = "";
            this._filePath = "";
        }
        this._isSaved = true;
        this._isCompiled = false;
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

    get isCompiled(): boolean {
        return this._isCompiled;
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
        // If not compiled show must compile before run
        // if (this._isCompiled)
        // this._terminalProcess.sendCommand(TerminalCommands.run(this.fileFolderPath));
        this.loadAST();
    }

    private loadAST() {
        const astxml = FileManager.openFile(`${this.fileFolderPath}/ast.xml`);
        this.ast = convert.xml2js(astxml);
        console.log(JSON.stringify(this.ast));
        
    }

    public close(): boolean {
        if (!this._isSaved) {
            return false;
        }
        this._terminalProcess.kill();
        return true;
    }
}
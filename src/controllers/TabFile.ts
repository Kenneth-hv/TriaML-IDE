// Copyright 2021 Tecnológico de Costa Rica
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
    private _tamCode = "";
    private _ast = {};
    private _table: Array<{ id: string, level: string }> = [];


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

    get tamCode(): string {
        return this._tamCode;
    }

    get ast(): any {
        return this._ast;
    }

    get table(): any {
        return this._table;
    }

    public saveFileContent() {
        FileManager.saveFile(this._filePath, this._fileContent);
        this._isSaved = true;
    }

    public compile(): boolean {
        if (this.filePath == "") return false;
        this._terminalProcess.sendCommand(TerminalCommands.createCompileCommand(this.fileFolderPath, this.fileName));
        this.loadAST();
        this.loadTable();
        return true;
    }

    public run() {
        if (this.filePath == "") return false;
        this._terminalProcess.sendCommand(TerminalCommands.createRunCommand(this.fileFolderPath, this.fileName));
        return true;
    }

    public loadTAMCode() {
        const dasmOuputFile = `${this.fileFolderPath}/.triaml/${this.fileName}/${TerminalCommands.DASM_OUTPUT}`
        this._tamCode = FileManager.openFile(dasmOuputFile);
    }

    public loadAST() {
        const astFile = `${this.fileFolderPath}/.triaml/${this.fileName}/${TerminalCommands.AST_OUTPUT}`
        const astXml = FileManager.openFile(astFile);
        this._ast = convert.xml2js(astXml);
    }

    public loadTable() {
        const tableFile = `${this.fileFolderPath}/.triaml/${this.fileName}/${TerminalCommands.TABLE_OUTPUT}`
        const tableXml = FileManager.openFile(tableFile);
        const table = convert.xml2js(tableXml);
        this._table = this.parseTable(table).reverse();
    }

    private parseTable(table: any): Array<{ id: string, level: string }> {
        let elements: Array<{ id: string, level: string }> = [];
        for (const i in table.elements) {
            const element = table.elements[i];
            if (element.name == "Declaration") {
                elements.push(element.attributes);
            } else {
                elements = elements.concat(this.parseTable(element));
            }
        }
        return elements;
    }

    public close(): boolean {
        if (!this._isSaved) {
            return false;
        }
        this._terminalProcess.kill();
        return true;
    }
}
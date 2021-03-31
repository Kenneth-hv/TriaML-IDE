import TabManager from "./TabManager";

export enum Tool {
    CODE_EDITOR,
    TERMINAL,
    DISASSEMBLER,
    AST,
    TABLE
}

export default class TriaMLApp {
    tabManager: TabManager = new TabManager();
    config = {
        cygwin: "C:/OCaml64/bin/bash.exe",
        triangleCompiler: "C:/Compile/Triangle.exe",
        tam: "C:/Compile/TAM.exe",
        dasm: "C:/Compile/Dasm.exe"
    }

    private _selectedTool: Tool = Tool.CODE_EDITOR;

    constructor() { }

    newFile() {
        this.tabManager.newTab();
    }

    openFile() {
        this.tabManager.openTab();
    }

    saveFile() {
        this.tabManager.saveCurrentTab();
    }

    saveFileAs() {
        this.tabManager.saveCurrentTabAs();
    }
    // TODO closetab

    showData() {
        console.log(this);
    }

    public get selectedTool(): Tool {
        return this._selectedTool;
    }
    public set selectedTool(tool: Tool) {
        this._selectedTool = tool;
    }

}
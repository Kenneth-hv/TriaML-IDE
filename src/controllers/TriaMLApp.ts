import TabFileManager from "./TabFileManager";

export enum Tool {
    CODE_EDITOR,
    TERMINAL,
    DISASSEMBLER,
    AST,
    TABLE
}

export default class TriaMLApp {
    private _tabFileManager: TabFileManager;
    private _selectedTool: Tool;

    constructor() {
        this._tabFileManager = new TabFileManager();
        this._selectedTool = Tool.CODE_EDITOR;
    }

    public get tabFileManager(): TabFileManager {
        return this._tabFileManager;
    }

    public get selectedTool(): Tool {
        return this._selectedTool;
    }
    public set selectedTool(tool: Tool) {
        this._selectedTool = tool;
    }

    public newFile() {
        this._tabFileManager.newTabFile();
    }

    public openFile() {
        this._tabFileManager.openTab();
    }

    public saveFile() {
        this._tabFileManager.saveCurrentTab();
    }

    public saveFileAs() {
        this._tabFileManager.saveCurrentTabAs();
    }

    public showData() {
        console.log(this);
    }
}
import TabFileManager from "./TabFileManager";
import { ipcRenderer, webFrame } from "electron";

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
        this._selectedTool = Tool.CODE_EDITOR;
    }

    public openFile() {
        if (this._tabFileManager.openTab()) {
            this._selectedTool = Tool.CODE_EDITOR;
        }
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

    public zoomIn() {
        webFrame.setZoomFactor(Math.min(webFrame.getZoomFactor() + 0.1, 1.3));
    }

    public zoomOut() {
        webFrame.setZoomFactor(Math.max(webFrame.getZoomFactor() - 0.1, 0.7));
    }
    
    public zoomDefault() {
        webFrame.setZoomFactor(1);
    }
}
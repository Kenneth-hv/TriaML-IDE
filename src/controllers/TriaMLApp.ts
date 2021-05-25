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

import TabFileManager from "./TabFileManager";
import { webFrame } from "electron";
import Store from "electron-store";
import { defaultConfig, Config } from "./config/config";

const store = new Store();

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
    private _showPreferences: boolean;
    private _showAbout: boolean;
    private _config: Config;

    constructor() {
        this._tabFileManager = new TabFileManager();
        this._selectedTool = Tool.CODE_EDITOR;
        this._showPreferences = false;
        this._showAbout = false;

        this._config = store.get('config') as Config;

        this._config.display.theme.options = defaultConfig.display.theme.options;
        this._config.display.language.options = defaultConfig.display.language.options;

        if (!this._config) {
            this._config = defaultConfig;
            store.set('config', this._config)
        }
    }

    public get tabFileManager(): TabFileManager {
        return this._tabFileManager;
    }

    public get selectedTool(): Tool {
        return this._selectedTool;
    }

    public set selectedTool(tool: Tool) {
        this.tabFileManager.updateTool(tool);
        this._selectedTool = tool;
    }

    public get showPreferences(): boolean {
        return this._showPreferences;
    }

    public get showAbout(): boolean {
        return this._showAbout;
    }

    public get config() {
        return this._config;
    }

    public openPreferences() {
        this._showPreferences = true;
    }

    public savePreferences() {
        const store = new Store();
        store.set('config', this._config);
    }

    public closePreferences() {
        this.savePreferences();
        this._showPreferences = false;
    }

    public openAbout() {
        this._showAbout = true;
    }

    public closeAbout() {
        this._showAbout = false;
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

    public run() {
        if (this._tabFileManager.run()) {
            this.selectedTool = Tool.TERMINAL;
        }
    }

    public compile() {
        if (this._tabFileManager.compile()) {
            this.selectedTool = Tool.TERMINAL;
        }
    }

    public close() {
        if(this._tabFileManager.closeAllTabs()) {
            window.close();
        }
    }
}
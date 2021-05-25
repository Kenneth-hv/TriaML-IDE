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

import { ipcRenderer } from "electron";

export default class TerminalProcess {
    private _processId: number;

    constructor(id: number) {
        this._processId = id;
        ipcRenderer.send("TERMINAL_INIT", this._processId);
    }

    public get processId(): number {
        return this._processId;
    }
    
    public sendCommand(command: string){
        this.write(command + '\r');
    }

    public write(data: any){
        ipcRenderer.send('TERMINAL_INPUT', data, this._processId);
    }

    public onData(fn: (event: any, data: any) => void) {
        ipcRenderer.on("TERMINAL_OUTPUT_ID_" + this._processId.toString(), fn);
    }
    
    public kill() {
        ipcRenderer.send("TERMINAL_KILL", this._processId);
    }

    public changeSize(cols: number, rows: number) {
        ipcRenderer.send("TERMINAL_CHANGE_SIZE", this._processId, cols, rows);
    }
}
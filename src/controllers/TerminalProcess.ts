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
}
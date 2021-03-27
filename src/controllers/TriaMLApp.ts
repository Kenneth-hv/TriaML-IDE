import TabManager from "./TabManager";
import { remote } from "electron";

export default class TriaMLApp {
    tabManager: TabManager = new TabManager();
    config = {
        cygwin: "C:/OCaml64/bin/bash.exe",
        triangleCompiler: "C:/Compile/Triangle.exe",
        tam: "C:/Compile/TAM.exe",
        dasm: "C:/Compile/Dasm.exe"
    }

    constructor() { }

    newFile() {
        this.tabManager.newTab();
    }

    openFile() {
        const ff = [{
            name: "Triangle Source File",
            extensions: ["tri"]
        }];
        const selectedFile = remote.dialog.showOpenDialogSync(remote.getCurrentWindow(), { filters: ff, properties: ['openFile'] });
        if (selectedFile)
            this.tabManager.openTab(selectedFile[0]);
    }

    saveFile(fileName: string) {
        this.tabManager.saveFile(fileName);
    }

    // TODO closetab

    showData() {
        console.log(this);
    }

}
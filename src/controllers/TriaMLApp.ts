import TabManager from "./TabManager";

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

}
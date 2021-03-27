import TabManager from "./TabManager";
import Tab from "./Tab"

export default class TriaMLApp {
    private static instance: TriaMLApp = new TriaMLApp();
    private tabManager: TabManager = new TabManager();
    config = {
        cygwin: "C:/OCaml64/bin/bash.exe",
        triangleCompiler: "C:/Compile/Triangle.exe",
        tam: "C:/Compile/TAM.exe",
        dasm: "C:/Compile/Dasm.exe"
    }

    private constructor () {}

    static getInstance(): TriaMLApp {
        return TriaMLApp.instance;
    }

    newFile(){
        this.tabManager.newTab();
    }
    
    openFile(fileName: string) {
        this.tabManager.openTab(fileName);
    }

    saveFile(fileName: string) {
        this.tabManager.saveFile(fileName);
    }

    // TODO closetab

    showData() {
        console.log(this);
    }

}
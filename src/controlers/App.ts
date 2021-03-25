import { TabManager } from "./TabManager";

class App {
    tabManager: TabManager = new TabManager();
    config = {
        cygwin: "C:/OCaml64/bin/bash.exe",
        triangleCompiler: "C:/Compile/Triangle.exe",
        tam: "C:/Compile/TAM.exe",
        dasm: "C:/Compile/Dasm.exe"
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
}
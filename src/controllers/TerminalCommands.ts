import Store from "electron-store";
import { Config } from "./config/config";

const store = new Store();

export default class TerminalCommands {
    static DASM_OUTPUT = "dasm.dout";
    static COMPILER_OUTPUT = "a.out";
    static AST_OUTPUT = "ast.xml";

    // NOT BEING USED BY THE COMPILER BUT IT'S THE DEFAULT OUTPUT
    static TABLE_OUTPUT = "tabla.xml";

    private static COMPILER_FLAGS = {
        "-o": TerminalCommands.COMPILER_OUTPUT,
        "-xd": TerminalCommands.AST_OUTPUT,
        // TODO "-xe": "xe.xml",
    }

    public static createCompileCommand(path: string, triangleFileName: string) {
        path = this.handleSpaces(path);
        triangleFileName = this.handleSpaces(triangleFileName);
        
        const env: Config = this.getConfig();
        const workspace = `${path}/.triaml/${triangleFileName}`;
        let compileCommand = `mkdir -p ${workspace}; cd ${workspace}; ${env.enviroment.compiler.value} ${path}/${triangleFileName}`;

        for (const [flag, arg] of Object.entries(this.COMPILER_FLAGS)) {
            compileCommand += ` ${flag} ${arg}`
        }

        if (process.platform == 'win32') {
            compileCommand = this.useCygwin(compileCommand);
        }

        return compileCommand;
    }

    public static createDisassemblerCommand(path: string, triangleFileName: string) {
        path = this.handleSpaces(path);
        triangleFileName = this.handleSpaces(triangleFileName);

        const env: Config = this.getConfig();
        const workspace = `${path}/.triaml/${triangleFileName}`;
        const compilerOutputFile = `${workspace}/${this.COMPILER_OUTPUT}`
        let disassembleCommand = `mkdir -p ${workspace}; cd ${workspace}; ${env.enviroment.disassembler.value} ${compilerOutputFile} > ${this.DASM_OUTPUT}`;

        if (process.platform == 'win32') {
            disassembleCommand = this.useCygwin(disassembleCommand);
        }

        return disassembleCommand;
    }

    public static createRunCommand(path: string, triangleFileName: string) {
        path = this.handleSpaces(path);
        triangleFileName = this.handleSpaces(triangleFileName);
        
        const env: Config = this.getConfig();
        const workspace = `${path}/.triaml/${triangleFileName}`;
        const compilerOutputFile = `${workspace}/${this.COMPILER_OUTPUT}`
        let runCommand = `mkdir -p ${workspace}; cd ${workspace}; ${env.enviroment.tam.value} ${compilerOutputFile}`;

        if (process.platform == 'win32') {
            runCommand = this.useCygwin(runCommand);
        } 

        return runCommand;
    }

    private static useCygwin(command: string): string {
        const env: Config = this.getConfig();
        return `${env.enviroment.cygwin.value} --login -c "${command}"`
    }

    private static handleSpaces(path: string): string {
        return path.replaceAll(' ', '\\ ');
    }

    private static getConfig(): Config {
        return store.get('config') as Config;
    }
}
export default class TerminalCommands {
    // HARD_CODED, PATH SETTINGS TO DO
    static TRIANGLE_COMPILER = 'C:/Compile/Triangle.exe'
    static TRIANGLE_DISASSEMBLER = 'C:/Compile/Dasm.exe'
    static TRIANGLE_ABSTRACT_MACHINE = 'C:/Compile/TAM.exe'
    static CYGWIN_BASH = 'C:/OCaml64/bin/bash'

    static DASM_OUTPUT = "dasm.dout";
    static COMPILER_OUTPUT = "a.out";
    static AST_OUTPUT = "ast.xml";

    // NOT BEING USED BY THE COMPILER BUT IT'S THE DEFAULT OUTPUT
    static TABLE_OUTPUT = "table.xml";

    private static COMPILER_FLAGS = {
        "-o": TerminalCommands.COMPILER_OUTPUT,
        "-xd": TerminalCommands.AST_OUTPUT,
        // TODO "-xe": "xe.xml",
    }

    public static createCompileCommand(path: string, triangleFileName: string) {
        const workspace = `${path}/.triaml/${triangleFileName}`;
        let compileCommand = `mkdir -p ${workspace}; cd ${workspace}; ${TerminalCommands.TRIANGLE_COMPILER} ${path}/${triangleFileName}`;

        for (const [flag, arg] of Object.entries(TerminalCommands.COMPILER_FLAGS)) {
            compileCommand += ` ${flag} ${arg}`
        }

        if (process.platform == 'win32') {
            compileCommand = TerminalCommands.useCygwin(compileCommand);
        }

        return compileCommand;
    }

    public static createDisassemblerCommand(path: string, triangleFileName: string) {
        const workspace = `${path}/.triaml/${triangleFileName}`;
        const compilerOutputFile = `${workspace}/${this.COMPILER_OUTPUT}`
        let disassembleCommand = `mkdir -p ${workspace}; cd ${workspace}; ${TerminalCommands.TRIANGLE_DISASSEMBLER} ${compilerOutputFile} > ${this.DASM_OUTPUT}`;

        if (process.platform == 'win32') {
            disassembleCommand = TerminalCommands.useCygwin(disassembleCommand);
        }

        return disassembleCommand;
    }

    public static createRunCommand(path: string, triangleFileName: string) {
        const workspace = `${path}/.triaml/${triangleFileName}`;
        const compilerOutputFile = `${workspace}/${this.COMPILER_OUTPUT}`
        let runCommand = `mkdir -p ${workspace}; cd ${workspace}; ${TerminalCommands.TRIANGLE_ABSTRACT_MACHINE} ${compilerOutputFile}`;

        if (process.platform == 'win32') {
            runCommand = TerminalCommands.useCygwin(runCommand);
        } 

        return runCommand;
    }

    private static useCygwin(command: string): string {
        return `${TerminalCommands.CYGWIN_BASH} --login -c "${command}"`
    }
}
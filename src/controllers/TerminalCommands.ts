export default class TerminalCommands {
    // HARD_CODED, PATH SETTINGS TO DO
    static TRIANGLE_COMPILER = 'C:/Compile/Triangle.exe'
    static TRIANGLE_DISASSEMBLER = 'C:/Compile/Dasm.exe'
    static TRIANGLE_ABSTRACT_MACHINE = 'C:/Compile/TAM.exe'
    static CYGWIN_BASH = 'C:/OCaml64/bin/bash'

    private static compilerFlags = {
        "-o": "a.out",
        "-xe": "xe.xml",
        "-xt": "ast.xml",
        "-tpp": "tpp.xml",
        "-tpx": "tpx.xml",
        "-tph": "tph.xml",
        "-xd": "xd.xml"
    }

    public static compile(path: string, triangleFile: string) {
        let compileCommand = `cd ${path}; ${TerminalCommands.TRIANGLE_COMPILER} ${triangleFile}`;

        for (const [flag, arg] of Object.entries(TerminalCommands.compilerFlags)) {
            compileCommand += ` ${flag} ${arg}`
        }

        if (process.platform == 'win32') {
            compileCommand = TerminalCommands.useCygwin(compileCommand);
        }

        return compileCommand;
    }

    public static disassemble(path: string) {
        const compilerOutputFile = `${path}/a.out`
        let disassembleCommand = `cd ${path}; ${TerminalCommands.TRIANGLE_COMPILER} ${compilerOutputFile}`;

        if (process.platform == 'win32') {
            disassembleCommand = TerminalCommands.useCygwin(disassembleCommand);
        }

        return disassembleCommand;
    }

    public static run(path: string) {
        const compilerOutputFile = `cd ${path}; ${path}/a.out`
        let runCommand = `${TerminalCommands.TRIANGLE_ABSTRACT_MACHINE} ${compilerOutputFile}`;

        if (process.platform == 'win32') {
            runCommand = TerminalCommands.useCygwin(runCommand);
        } 

        return runCommand;
    }

    private static useCygwin(command: string): string {
        return `${TerminalCommands.CYGWIN_BASH} --login -c "${command}"`
    }
}
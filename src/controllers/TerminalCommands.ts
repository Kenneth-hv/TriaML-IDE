export default class TerminalCommands {
    // HARD_CODED, PATH SETTINGS TO DO
    static TRIANGLE_COMPILER = 'C:/Compile/Triangle.exe'
    static TRIANGLE_DISASSEMBLER = 'C:/Compile/Dasm.exe'
    static TRIANGLE_ABSTRACT_MACHINE = 'C:/Compile/TAM.exe'
    static CYGWIN_BASH = 'C:/OCaml64/bin/bash'

    private static compilerFlags = {
        "-o": "/a.out",
        "-xe": "/xe.xml",
        "-xt": "/xt.xml",
        "-tpp": "/tpp.xml",
        "-tpx": "/tpx.xml",
        "-tph": "/tph.xml",
        "-xd": "/xd.txt"
    }

    public static compile(path: string, triangleFile: string) {
        let compileCommand = `${TerminalCommands.TRIANGLE_COMPILER} ${triangleFile}`;

        for (const [flag, file] of Object.entries(TerminalCommands.compilerFlags)) {
            compileCommand += ` ${flag} ${path}${file}`
        }

        if (process.platform == 'win32') {
            compileCommand = TerminalCommands.useCygwin(compileCommand);
        }

        return compileCommand;
    }

    public static disassemble(path: string) {
        const compilerOutputFile = `${path}/a.out`
        let disassembleCommand = `${TerminalCommands.TRIANGLE_COMPILER} ${compilerOutputFile}`;

        if (process.platform == 'win32') {
            disassembleCommand = TerminalCommands.useCygwin(disassembleCommand);
        }

        return disassembleCommand;
    }

    public static run(path: string) {
        const compilerOutputFile = `${path}/a.out`
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
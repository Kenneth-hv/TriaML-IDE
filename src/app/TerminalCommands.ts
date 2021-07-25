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

import { Config } from "./config/config";

export default class TerminalCommands {
    static DASM_OUTPUT = "dasm.dout";
    static COMPILER_OUTPUT = "a.out";
    static AST_OUTPUT = "ast.xml";
    static ERROR_OUTPUT = "xe.xml";

    // NOT BEING USED BY THE COMPILER BUT IT'S THE DEFAULT OUTPUT
    static TABLE_OUTPUT = "tabla.xml";

    private static COMPILER_FLAGS = {
        "-o": TerminalCommands.COMPILER_OUTPUT,
        "-xd": TerminalCommands.AST_OUTPUT,
        "-xe": TerminalCommands.ERROR_OUTPUT
    }

    public static createCompileCommand(path: string, triangleFileName: string, config: Config) {
        path = this.convertPath(path);
        triangleFileName = this.convertPath(triangleFileName);

        const workspace = `${path}/.triaml/${triangleFileName}`;
        const compilerOutputFile = `${workspace}/${this.COMPILER_OUTPUT}`

        let compileCommand = `mkdir -p ${workspace}; cd ${workspace}; ${config.enviroment.compiler.value} ${path}/${triangleFileName}`;

        for (const [flag, arg] of Object.entries(this.COMPILER_FLAGS)) {
            compileCommand += ` ${flag} ${arg}`
        }

        compileCommand += `; ${config.enviroment.disassembler.value} ${compilerOutputFile} > ${this.DASM_OUTPUT}`

        if (process.platform == 'win32') {
            compileCommand = this.useCygwin(compileCommand, config);
        }

        return compileCommand;
    }

    public static createRunCommand(path: string, triangleFileName: string, config: Config) {
        path = this.convertPath(path);
        triangleFileName = this.convertPath(triangleFileName);

        const workspace = `${path}/.triaml/${triangleFileName}`;
        const compilerOutputFile = `${workspace}/${this.COMPILER_OUTPUT}`
        let runCommand = `mkdir -p ${workspace}; cd ${workspace}; ${config.enviroment.tam.value} ${compilerOutputFile}`;

        if (process.platform == 'win32') {
            runCommand = this.useCygwin(runCommand, config);
        }

        return runCommand;
    }

    private static useCygwin(command: string, config: Config): string {
        const cygwin = config.enviroment.cygwin?.value || 'MISSING_CYGWIN';
        return `${this.convertPath(cygwin as string)} --login -c "${command}"`
    }

    private static convertPath(path: string): string {
        // Replaces all \ to / and <space> with \\<space>
        return path.replaceAll('\\', '/').replaceAll(' ', '\\ ');
    }
}
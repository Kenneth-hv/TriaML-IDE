// Copyright 2021 Tecnológico de Costa Rica

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export const Syntax: any = {
    keywords: [
        "begin",
        "const",
        "do",
        "else",
        "end",
        "func",
        "if",
        "in",
        "let",
        "of",
        "proc",
        "record",
        "then",
        "type",
        "var",
        "while",
        "putint",
    ],

    typeKeywords: [
        "Integer literal",
        "Character literal",
        "array",
        "Integer",
        "Char",
        "String",
        "Boolean",
    ],

    brackets: [
        { open: "{", close: "}", token: "delimiter.curly" },
        { open: "[", close: "]", token: "delimiter.bracket" },
        { open: "(", close: ")", token: "delimiter.parenthesis" },
    ],

    tokenizer: {
        root: [
            { include: "@whitespace" },
            { include: "@numbers" },
            { include: "@strings" },

            [/[.,:;]/, "delimiter"],
            [/[{}[]()]/, "@brackets"],

            [/@[a-zA-Z]\w*/, "tag"],
            [
                /[a-zA-Z]\w*/,
                {
                    cases: {
                        "@keywords": "keyword",
                        "@default": "identifier",
                    },
                },
            ],
        ],

        // Deal with white space, including single and multi-line comments
        whitespace: [
            [/\s+/, "white"],
            [/(^!.*$)/, "comment"],
        ],

        // Recognize hex, negatives, decimals, imaginaries, longs, and scientific notation
        numbers: [
            [/-?0x([abcdef]|[ABCDEF]|\d)+[lL]?/, "number.hex"],
            [/-?(\d*\.)?\d+([eE][+-]?\d+)?[jJ]?[lL]?/, "number"],
        ],

        // Recognize strings, including those broken across lines with \ (but not without)
        strings: [
            [/"$/, "string.escape", "@popall"],
            [/"/, "string.escape", "@stringBody"],
            [/"$/, "string.escape", "@popall"],
            [/"/, "string.escape", "@dblStringBody"],
        ],
        stringBody: [
            [/[^\\"]+$/, "string", "@popall"],
            [/[^\\"]+/, "string"],
            [/\\./, "string"],
            [/"/, "string.escape", "@popall"],
            [/\\$/, "string"],
        ],
        dblStringBody: [
            [/[^\\"]+$/, "string", "@popall"],
            [/[^\\"]+/, "string"],
            [/\\./, "string"],
            [/"/, "string.escape", "@popall"],
            [/\\$/, "string"],
        ],
    },
};
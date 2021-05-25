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
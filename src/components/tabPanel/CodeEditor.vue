<template>
  <div ref="editor" class="editor" :class="{ active: isActive }"></div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";
import Tab from "@/controllers/Tab";
import * as monaco from "monaco-editor";

@Options({
  components: { CodeEditor },
  props: {
    tab: Tab,
    isActive: Boolean,
  },
})
export default class CodeEditor extends Vue {
  store = setup(() => useStore());
  tab!: Tab;
  isActive!: Boolean;

  mounted() {
    let tab = this.tab;

    var syntax = {
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
    } as any;

    monaco.languages.register({ id: "triangle" });

    monaco.languages.setMonarchTokensProvider("triangle", syntax);
    let container = this.$refs["editor"] as HTMLElement;

    let theme = {
      base: "vs-dark",
      inherit: true,
      colors: {
        "editor.background": "#00000000",
      },
      rules: [],
    };
    monaco.editor.defineTheme("theme", theme as any);
    let editor = monaco.editor.create(container, {
      value: tab.fileContent,
      language: "triangle",
      theme: "theme",
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
    });

    editor.onDidChangeModelContent(function () {
      tab.fileContent = editor.getValue();
    });
  }
}
</script>

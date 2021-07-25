Copyright 2021 Tecnológico de Costa Rica

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

<template>
  <div ref="editor" class="editor" :class="{ active: isActive }"></div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";
import TabFile from "@/app/TabFile";
import * as monaco from "monaco-editor";
import { Syntax } from "./TriangleSyntax";

@Options({
  components: { CodeEditor },
  props: {
    tabFile: TabFile,
    isActive: Boolean,
  },
})
export default class CodeEditor extends Vue {
  store = setup(() => useStore());
  tabFile!: TabFile;
  isActive!: Boolean;

  mounted() {
    const tabFile = this.tabFile;
    const container = this.$refs["editor"] as HTMLElement;

    monaco.languages.register({ id: "triangle" });
    monaco.languages.setMonarchTokensProvider("triangle", Syntax);

    let editor = monaco.editor.create(container, {
      value: tabFile.fileContent,
      language: "triangle",
      theme: "theme",
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
    });

    editor.onDidChangeModelContent(() => {
      tabFile.fileContent = editor.getValue();
    });

    tabFile.changePositionCallback = (row: number, column: number) => {
      // Wait 200ms to make sure tab is shown
      setTimeout(() => {
        editor.revealPositionInCenterIfOutsideViewport(
          {
            column: column,
            lineNumber: row,
          },
          1
        );
        editor.setPosition({
          column: column + 1,
          lineNumber: row,
        });
        editor.focus();
      }, 200);
    };
  }
}
</script>

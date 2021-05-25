<template>
  <div ref="editor" class="editor" :class="{ active: isActive }"></div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";
import TabFile from "@/controllers/TabFile";
import * as monaco from "monaco-editor";
import { Syntax } from "./TriangleSyntax"

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
  }
}
</script>

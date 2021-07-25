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
  <div class="tab-content" v-bind:class="{ active: isActive }">
    <CodeEditor
      :isActive="getSelectedTool() == tools.CODE_EDITOR"
      :tabFile="this.tabFile"
    />
    <Terminal
      :isActive="getSelectedTool() == tools.TERMINAL"
      :tabFile="this.tabFile"
    />
    <TAMCodeView
      :isActive="getSelectedTool() == tools.DISASSEMBLER"
      :tabFile="this.tabFile"
    />
    <ASTView
      :isActive="getSelectedTool() == tools.AST"
      :tabFile="this.tabFile"
    />
    <TableView
      :isActive="getSelectedTool() == tools.TABLE"
      :tabFile="this.tabFile"
    />
    <ErrorView
      :isActive="getSelectedTool() == tools.ERROR"
      :tabFile="this.tabFile"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";
import TabFile from "@/app/TabFile";
import CodeEditor from "./Editor/CodeEditor.vue";
import Terminal from "./Terminal/Terminal.vue";
import ASTView from "./ASTView/ASTView.vue";
import TAMCodeView from "./TAMCodeView/TAMCodeView.vue";
import TableView from "./TableView/TableView.vue";
import ErrorView from "./Errors/ErrorView.vue"
import { Tool } from "@/app/TriaML";

@Options({
  components: { CodeEditor, Terminal, ASTView, TAMCodeView, TableView, ErrorView },
  props: {
    tabFile: TabFile,
    isActive: Boolean,
  },
})
export default class TabContent extends Vue {
  store = setup(() => useStore());
  tools = Tool;

  getSelectedTool() {
    return this.store.state.triaMLApp.selectedTool;
  }
}
</script>

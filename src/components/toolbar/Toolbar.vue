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
  <div id="toolbar">
    <ToolbarButton iconName="run" @click="run()" />
    <ToolbarButton iconName="debug" @click="compile()" />
    <div class="toolbar-space"></div>
    <ToolbarButton
      iconName="tri"
      :class="{
        active: getSelectedTool() == tools.CODE_EDITOR && this.showToolbar(),
      }"
      @click="setSelectedTool(tools.CODE_EDITOR)"
    />
    <ToolbarButton
      iconName="console"
      :class="{ active: getSelectedTool() == tools.TERMINAL && this.showToolbar() }"
      @click="setSelectedTool(tools.TERMINAL)"
    />
    <ToolbarButton
      iconName="tam"
      :class="{ active: getSelectedTool() == tools.DISASSEMBLER && this.showToolbar() }"
      @click="setSelectedTool(tools.DISASSEMBLER)"
    />
    <ToolbarButton
      iconName="tree"
      :class="{ active: getSelectedTool() == tools.AST && this.showToolbar() }"
      @click="setSelectedTool(tools.AST)"
    />
    <ToolbarButton
      iconName="table"
      :class="{ active: getSelectedTool() == tools.TABLE && this.showToolbar() }"
      @click="setSelectedTool(tools.TABLE)"
    />
    <ToolbarButton
      iconName="error"
      :class="{ active: getSelectedTool() == tools.ERROR && this.showToolbar() }"
      @click="setSelectedTool(tools.ERROR)"
    />
  </div>
</template>


<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";
import ToolbarButton from "./ToolbarButton.vue";
import { Tool } from "@/app/TriaML";

@Options({
  components: { ToolbarButton },
})
export default class Toolbar extends Vue {
  store = setup(() => useStore());
  tools = Tool;

  getSelectedTool() {
    return this.store.state.triaMLApp.selectedTool;
  }

  showToolbar() {
    return this.store.state.triaMLApp.tabFileManager.selectedIndex != -1;
  }

  setSelectedTool(tool: Tool) {
    this.store.dispatch("SET_SELECTED_TOOL", tool);
  }

  run() {
    this.store.dispatch("RUN");
  }

  compile() {
    this.store.dispatch("COMPILE");
  }
}
</script>

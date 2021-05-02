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
  </div>
</template>


<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";
import ToolbarButton from "./ToolbarButton.vue";
import { Tool } from "@/controllers/TriaMLApp";

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

<template>
  <div id="toolbar">
    <ToolbarButton iconName="run" />
    <ToolbarButton iconName="debug" />
    <div class="toolbar-space"></div>
    <ToolbarButton
      iconName="tri"
      :class="{ active: getSelectedTool() == tools.CODE_EDITOR }"
      @click="setSelectedTool(tools.CODE_EDITOR)"
    />
    <ToolbarButton
      iconName="console"
      :class="{ active: getSelectedTool() == tools.TERMINAL }"
      @click="setSelectedTool(tools.TERMINAL)"
    />
    <ToolbarButton
      iconName="tam"
      :class="{ active: getSelectedTool() == tools.DISASSEMBLER }"
      @click="setSelectedTool(tools.DISASSEMBLER)"
    />
    <ToolbarButton
      iconName="tree"
      :class="{ active: getSelectedTool() == tools.AST }"
      @click="setSelectedTool(tools.AST)"
    />
    <ToolbarButton
      iconName="table"
      :class="{ active: getSelectedTool() == tools.TABLE }"
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

  setSelectedTool(tool: Tool) {
    this.store.dispatch("SET_SELECTED_TOOL", tool);
  }
}
</script>

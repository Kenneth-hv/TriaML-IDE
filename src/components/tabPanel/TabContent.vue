<template>
  <div class="tab-content" v-bind:class="{ active: isActive }" >
    <CodeEditor :isActive="getSelectedTool() == tools.CODE_EDITOR" :tabFile="this.tabFile"/>
    <Terminal :isActive="getSelectedTool() == tools.TERMINAL" :tabFile="this.tabFile"/>
  </div>
</template>


<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import CodeEditor from "./CodeEditor.vue";
import { useStore } from "@/store";
import TabFile from "@/controllers/TabFile";
import Terminal from "./Terminal.vue"
import { Tool } from "@/controllers/TriaMLApp";

@Options({
  components: { CodeEditor, Terminal },
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


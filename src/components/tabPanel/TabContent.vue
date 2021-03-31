<template>
  <div class="tab-content" v-bind:class="{ active: isActive }" >
    <CodeEditor :isActive="getSelectedTool() == tools.CODE_EDITOR" :tab="this.tab"/>
    <Terminal :isActive="getSelectedTool() == tools.TERMINAL" :tab="this.tab"/>
  </div>
</template>


<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import CodeEditor from "./CodeEditor.vue";
import { useStore } from "@/store";
import Tab from "@/controllers/Tab";
import Terminal from "./Terminal.vue"
import { Tool } from "@/controllers/TriaMLApp";

@Options({
  components: { CodeEditor, Terminal },
  props: {
    tab: Tab,
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


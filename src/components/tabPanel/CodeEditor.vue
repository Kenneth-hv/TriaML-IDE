<template>
  <div class="editor-grid">
    <div class="line-numbers"></div>
    <textarea
      class="code-editor"
      spellcheck="false"
      v-model="this.tab.fileContent"
    ></textarea>
  </div>
</template>


<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";
import Tab from "@/controllers/Tab";

@Options({
  components: { CodeEditor },
  props: {
    tab: Tab,
  },
})
export default class CodeEditor extends Vue {
  store = setup(() => useStore());
  tab!: Tab;

  print() {
    console.log(this.tab.fileContent);
  }
}
</script>

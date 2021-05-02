<template>
  <div class="ast-view" :class="{ active: isActive }">
    <ASTViewNode v-if="tabFile.ast.elements" :node="tabFile.ast.elements[0]" />
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import ASTViewNode from "./ASTViewNode.vue";
import { useStore } from "@/store";
import TabFile from "@/controllers/TabFile";

@Options({
  props: {
    tabFile: TabFile,
    isActive: Boolean,
  },
  components: {
    ASTViewNode,
  },
})
export default class ASTView extends Vue {
  store = setup(() => useStore());
  tabFile!: TabFile;
}
</script>

<style></style>

<template>
  <div
    v-if="node"
    class="ast-node"
    :class="{ extended: extended, leafnode: !node.elements }"
  >
    <span @click.stop="toggle()">{{ node.name }}</span>
    <div class="ast-item" v-for="n_node in node.elements" :key="n_node">
      <ASTViewNode :node="n_node" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";

@Options({
  props: {
    node: {},
  },
})
export default class ASTViewNode extends Vue {
  store = setup(() => useStore());
  extended: boolean = false;

  toggle() {
    this.extended = !this.extended;
  }
}
</script>

<style></style>

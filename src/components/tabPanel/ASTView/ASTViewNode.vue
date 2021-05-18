<template>
  <div v-if="node.elements">
    <div
      v-if="node"
      class="ast-node"
      :class="{ extended: extended, hover : isHovering }"
      @mouseover.stop="isHovering = true"
      @mouseout="isHovering = false"
    >
      <span @click.stop="toggle()">{{ `${extended ? '[-]' : '[+]' } ${node.name}` }}</span>
      <div class="ast-item" v-for="n_node in node.elements" :key="n_node">
        <ASTViewNode :node="n_node" />
      </div>
    </div>
  </div>
  <div v-else>
    <span class="leafnode">{{ node.name }} {{ node.attributes ?  ": " +  node.attributes.value : "" }}</span>
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
  extended: boolean = true;
  isHovering: boolean = false;

  toggle() {
    this.extended = !this.extended;
  }
}
</script>

<style></style>

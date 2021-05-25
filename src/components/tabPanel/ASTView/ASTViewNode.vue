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

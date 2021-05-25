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
  <FloatingPanelBackground>
    <div class="floating-panel">
      <div class="header drag-region">
        <slot name="header"></slot>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </FloatingPanelBackground>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import FloatingPanelBackground from "./FloatingPanelBackground.vue";

@Options({
  props: {
    isActive: Boolean,
  },
  components: { FloatingPanelBackground },
})
export default class FloatingPanel extends Vue {}
</script>

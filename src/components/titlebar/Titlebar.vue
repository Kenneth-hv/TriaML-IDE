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
  <div id="titlebar" class="drag-region">
    <div id="frr-1" class="floating-resize-region"></div>
    <div id="frr-2" class="floating-resize-region"></div>
    <div id="frr-3" class="floating-resize-region"></div>
    <div id="window-icon">
      <img src="@/assets/img/logo.png" />
    </div>

    <WindowMenu />

    <div id="window-title">
      <span>TriaML</span>
    </div>

    <WindowControls />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import WindowControls from "./controls/WindowControls.vue";
import WindowMenu from "./menu/WindowMenu.vue";

@Options({
  components: { WindowControls, WindowMenu },
  props: {
    tabName: String,
  },
})
export default class Titlebar extends Vue {
  tabName!: string;
}
</script>
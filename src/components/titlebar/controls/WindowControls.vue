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
  <div id="window-controls">
    <WindowButton id="min-button" iconName="min" @click="minimize" />
    <WindowButton id="restore-button" iconName="restore" @click="maximize" />
    <WindowButton id="max-button" iconName="max" @click="maximize" />
    <WindowButton id="close-button" iconName="close" @click="close" />
  </div>
</template>

<script  lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";
import WindowButton from "./WindowButton.vue";
const { remote } = require('electron');
const win = remote.getCurrentWindow();

@Options({
  components: { WindowButton }
})
export default class WindowControls extends Vue {
  store = setup(() => useStore());

  close() {
    this.store.dispatch('CLOSE');
  }

  maximize() {
    if (remote.getCurrentWindow().isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
  
  minimize() {
    win.minimize();
  }
}
</script>
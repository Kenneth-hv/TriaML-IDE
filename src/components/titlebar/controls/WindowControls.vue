<template>
  <div id="window-controls">
    <WindowButton id="min-button" iconName="min" @click="minimize" />
    <WindowButton id="restore-button" iconName="restore" @click="maximize" />
    <WindowButton id="max-button" iconName="max" @click="maximize" />
    <WindowButton id="close-button" iconName="close" @click="close" />
  </div>
</template>

<script  lang="ts">
import { Options, Vue } from "vue-class-component";
import WindowButton from "./WindowButton.vue";
const { remote } = require('electron');
const win = remote.getCurrentWindow();

@Options({
  components: { WindowButton }
})
export default class WindowControls extends Vue {
  close() {
    win.close();
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
<template>
  <div id="window-controls">
    <windowButton id="min-button" iconName="min" @click="minimize"/>
    <windowButton id="restore-button" iconName="restore" @click="maximize"/>
    <windowButton id="max-button" iconName="max" @click="maximize"/>
    <windowButton id="close-button" iconName="close" @click="close"/>
  </div>
</template>

<script>
import windowButton from "./windowButton.vue";
const win = window.remote.getCurrentWindow();

export default {
  components: { windowButton },
  name: "windowControls",
  methods: {
    close() {
      win.close();
    },
    maximize() {
      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
    },
    minimize() {
      win.minimize();
    },
    isWindowMaximized() {
      return () => { console.log(win.isMaximized()); return win.isMaximized(); }
    }
  }
};
</script>
<template>
  <div ref="terminal" class="terminal-view" :class="{ active: isActive }"></div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";
import Tab from "@/controllers/Tab";
import { Terminal as Xterm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { ipcRenderer } from "electron";
import "xterm/css/xterm.css";

@Options({
  components: {},
  props: {
    tab: Tab,
    isActive: Boolean,
  },
})
export default class Terminal extends Vue {
  store = setup(() => useStore());
  tab!: Tab;
  isActive!: Boolean;

  mounted() {
    let terminalView = this.$refs["terminal"] as HTMLElement;
    let term = new Xterm({
      theme: {
        foreground: "#ffffff",
        background: "#1E1E1E"
      },
    });
    let fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalView);
    fitAddon.fit();

    ipcRenderer.on(
      "TERMINAL_OUTPUT_ID_" + this.tab.id.toString(),
      (event, data) => {
        term.write(data);
      }
    );

    term.onData((data) => {
      ipcRenderer.send("TERMINAL_INPUT", data, this.tab.id);
    });
  }
}
</script>
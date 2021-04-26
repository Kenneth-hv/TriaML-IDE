<template>
  <div ref="terminal" class="terminal-view" :class="{ active: isActive }"></div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";
import TabFile from "@/controllers/TabFile";
import { Terminal as Xterm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

@Options({
  components: {},
  props: {
    tabFile: TabFile,
    isActive: Boolean,
  },
})
export default class Terminal extends Vue {
  store = setup(() => useStore());
  tabFile!: TabFile;
  isActive!: Boolean;

  mounted() {
    let terminalView = this.$refs["terminal"] as HTMLElement;
    let term = new Xterm({
      theme: {
        foreground: "#ffffff",
        background: "#1E1E1E",
      },
    });
    let fitAddon = new FitAddon();

    term.loadAddon(fitAddon);
    term.open(terminalView);

    window.setInterval(() => {
      fitAddon.fit();
    }, 100);

    this.tabFile.terminalProcess.onData((_event, data) => {
      term.write(data);
    });

    term.onData((data) => {
      this.tabFile.terminalProcess.write(data);
    });
  }
}
</script>
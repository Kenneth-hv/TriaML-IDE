<template>
  <div ref="terminal" class="terminal-view" :class="{ active: isActive }"></div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";
import TabFile from "@/controllers/TabFile";
import { Terminal as Xterm, ITheme } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import Store from "electron-store";
import { terminalThemes } from "./TerminalThemes";
import { themeMappings } from "@/assets/styles/themes/mappings";

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
  terminal!: Xterm;

  mounted(): void {
    let terminalView = this.$refs["terminal"] as HTMLElement;

    this.terminal = new Xterm({
      theme: this.getTheme(),
    });

    let fitAddon = new FitAddon();

    this.terminal.loadAddon(fitAddon);
    this.terminal.open(terminalView);

    const self = this;
    window.setInterval((): void => {
      if (self.isActive) {
        fitAddon.fit();
        self.tabFile.terminalProcess.changeSize(
          self.terminal.cols,
          self.terminal.rows
        );
        self.terminal.setOption("theme", this.getTheme());
      }
    }, 50);

    this.tabFile.terminalProcess.onData((_event, data) => {
      this.terminal.write(data);
    });

    this.terminal.onData((data) => {
      this.tabFile.terminalProcess.write(data);
    });
  }

  updated(): void {
    this.terminal.setOption("theme", this.getTheme());
  }

  getTheme(): ITheme {
    const store = new Store();
    const theme = store.get("config.display.theme.selected") as string;
    return terminalThemes[themeMappings[theme.toLowerCase()].terminal];
  }
}
</script>

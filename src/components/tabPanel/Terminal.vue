<template>
  <div ref="terminal" class="terminal" :class="{ active: isActive }"></div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";
import Tab from "@/controllers/Tab";
import { Terminal as Xterm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "@/xterm/css/xterm.css";

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
    // let externalScript = document.createElement("script");
    // externalScript.setAttribute("src", "/xterm/lib/xterm.js");
    // document.head.appendChild(externalScript);

    let terminalView = this.$refs["terminal"] as HTMLElement;
    let term = new Xterm({});
    let fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalView);
    fitAddon.fit();
  }
}
</script>
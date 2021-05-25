<template>
  <Title :title="this.title" />
  <body :class="[getTheme(), getIconTheme()]">
    <Titlebar />

    <div id="main">
      <Toolbar />
      <TabPanel />
    </div>
    <Preferences @update_preferences="update()" />
    <About />
  </body>
</template>

<script lang="ts">
import Title from "./components/Title.vue";
import Titlebar from "./components/titlebar/Titlebar.vue";
import Toolbar from "./components/toolbar/Toolbar.vue";
import TabPanel from "./components/tabPanel/TabPanel.vue";
import Preferences from "./components/dialogs/Preferences.vue";
import About from "./components/dialogs/About.vue";
import { ipcRenderer } from "electron";
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";
import Store from "electron-store";
import * as monaco from "monaco-editor";
import { themeMappings } from "./assets/styles/themes/mappings";

@Options({
  components: { Title, Titlebar, Toolbar, TabPanel, Preferences, About },
})
export default class App extends Vue {
  store = setup(() => useStore());
  title = "TriaML";

  mounted(): void {
    ipcRenderer.on("SET_WINDOW_MAXIMIZED", (_, data) => {
      if (data) {
        document.body.classList.add("maximized");
      } else {
        document.body.classList.remove("maximized");
      }
    });
    this.update();
  }

  update(): void {
    monaco.editor.defineTheme("theme", this.getEditorTheme());
    this.$forceUpdate();
  }

  getTheme(): string {
    const store = new Store();
    const theme = store.get("config.display.theme.selected") as string;
    return themeMappings[theme.toLowerCase()].css;
  }

  getIconTheme(): string {
    const store = new Store();
    const theme = store.get("config.display.theme.selected") as string;
    return themeMappings[theme.toLowerCase()].icons;
  }

  getEditorTheme(): any {
    const store = new Store();
    const theme = store.get("config.display.theme.selected") as string;

    const editor_theme = {
      base: themeMappings[theme.toLowerCase()].editor,
      inherit: true,
      colors: {
        "editor.background": "#00000000",
      },
      rules: [],
    } as any;

    return editor_theme;
  }
}
</script>

<style lang="scss">
@import "./assets/styles/style.scss";
@import "./assets/styles/iconsWhite.scss";
@import "./assets/styles/iconsBlack.scss";
</style>

<style lang="css">
@import "./assets/styles/themes/dark.css";
@import "./assets/styles/themes/black.css";
@import "./assets/styles/themes/blue.css";
@import "./assets/styles/themes/light.css";
</style>

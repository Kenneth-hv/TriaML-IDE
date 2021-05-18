<template>
  <Title :title="this.title" />
  <body>
    <Titlebar />

    <div id="main">
      <Toolbar />
      <TabPanel />
    </div>
    <Preferences />
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

@Options({
  components: { Title, Titlebar, Toolbar, TabPanel, Preferences, About },
})
export default class App extends Vue {
  store = setup(() => useStore());
  title = "TriaML";

  mounted() {
    ipcRenderer.on("SET_WINDOW_MAXIMIZED", (_event, data) => {
      if (data) {
        document.body.classList.add("maximized");
      } else {
        document.body.classList.remove("maximized");
      }
    });
  }
}
</script>

<style lang="scss">
@import "./assets/styles/style.scss";
</style>

<template>
  <Title :title="this.title"/>
  <body>
    <Titlebar />

    <div id="main">
      <Toolbar />
      <TabPanel />
    </div>
  </body>
</template>

<script lang="ts">
import Title from "./components/Title.vue";
import Titlebar from "./components/titlebar/Titlebar.vue";
import Toolbar from "./components/toolbar/Toolbar.vue";
import TabPanel from "./components/tabPanel/TabPanel.vue";

import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";

@Options({
  components: { Title, Titlebar, Toolbar, TabPanel },
})
export default class App extends Vue {
  store = setup(() => useStore());
  title = "TriaML";
}
</script>

<style lang="scss">
@import "./assets/styles/dark.scss";
@import "./assets/styles/style.scss";
</style>
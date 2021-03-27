<template>
  <body>
    <Titlebar />

    <div id="main">
      <Toolbar />
      <TabPanel />
    </div>
  </body>
</template>

<script lang="ts">
import Titlebar from "./components/titlebar/Titlebar.vue";
import Toolbar from "./components/toolbar/Toolbar.vue";
import TabPanel from "./components/tabPanel/TabPanel.vue";

import { Options, Vue } from 'vue-class-component';

@Options({
  components: { Titlebar, Toolbar, TabPanel },
})
export default class App extends Vue {}
</script>

<style>
@import "./assets/style.css";
@import "./assets/theme-dark.css";
</style>
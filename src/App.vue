<template>
  <body>
    <titleBar />

    <div id="main">
      <toolBar />
      <tabPanel />
    </div>
  </body>
</template>

<script>
/* eslint-disable no-unused-vars */
import titleBar from "./components/titleBar/titleBar.vue";
import toolBar from "./components/toolBar/toolbar.vue";
import tabPanel from "./components/tabPanel/tabPanel.vue";

export default {
  components: { titleBar, toolBar, tabPanel },
};
</script>

<style>
@import "./assets/style.css";
</style>

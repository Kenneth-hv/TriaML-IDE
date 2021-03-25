<template>
  <div id="tab-panel">
    <div id="tab-group">
      <tab tabName="hola.tri" isActive=true />
      <tab tabName="hola.tri" />
    </div>

    <tabContent />
  </div>
</template>

<script>
import tab from './tab.vue'
import tabContent from './tabContent.vue'

export default {
  components : { tab, tabContent },
  name: "tabPanel",
};
</script>

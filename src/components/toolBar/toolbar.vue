<template>
  <div id="toolbar">
    <toolbarButton iconName="run" />
    <toolbarButton iconName="debug" />
    <div class="toolbar-space"></div>
    <toolbarButton iconName="tri" />
    <toolbarButton iconName="console" />
    <toolbarButton iconName="tam" />
    <toolbarButton iconName="tree" />
    <toolbarButton iconName="table" />
  </div>
</template>


<script>
import toolbarButton from './toolbarButton.vue'

export default {
  components: { toolbarButton },
  name: "toolbar",

}
</script>

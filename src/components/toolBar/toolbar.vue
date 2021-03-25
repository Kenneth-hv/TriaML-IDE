<template>
  <div id="toolbar">
    <ToolbarButton iconName="run" />
    <ToolbarButton iconName="debug" />
    <div class="toolbar-space"></div>
    <ToolbarButton iconName="tri" />
    <ToolbarButton iconName="console" />
    <ToolbarButton iconName="tam" />
    <ToolbarButton iconName="tree" />
    <ToolbarButton iconName="table" />
  </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ToolbarButton from './ToolbarButton.vue'

@Options({
  components: { ToolbarButton }
})
export default class Toolbar extends Vue { }
</script>

<template>
  <div id="titlebar" class="drag-region">
    <div id="frr-1" class="floating-resize-region"></div>
    <div id="frr-2" class="floating-resize-region"></div>
    <div id="frr-3" class="floating-resize-region"></div>
    <div id="window-icon">
      <img src="@/assets/img/logo.png" />
    </div>

    <WindowMenu />

    <div id="window-title">
      <span>TriaML</span>
    </div>

    <WindowControls />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import WindowControls from "./controls/WindowControls.vue";
import WindowMenu from "./menu/WindowMenu.vue";

@Options({
  components: { WindowControls, WindowMenu },
  props: {
    tabName: String,
  },
})
export default class Titlebar extends Vue {
  tabName!: string;
}
</script>
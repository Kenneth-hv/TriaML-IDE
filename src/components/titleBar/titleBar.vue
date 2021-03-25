<template>
  <header id="titlebar">
    <div id="drag-region">
      <div id="window-icon">
        <img src="@/assets/logo.png" />
      </div>

      <div id="window-menu">
        <div class="button">File</div>
        <div class="button">Edit</div>
        <div class="button">View</div>
        <div class="button">Help</div>
      </div>

      <div id="window-title">
        <span>TriaML</span>
      </div>

      <WindowControls />
    </div>
  </header>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import WindowControls from './windowControls/WindowControls.vue'

@Options({
  components : { WindowControls },
  props: {
    tabName: String
  }
})
export default class Titlebar extends Vue {
    tabName!: string
}
</script>
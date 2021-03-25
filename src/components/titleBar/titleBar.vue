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

      <windowControls />
    </div>
  </header>
</template>

<script>
import windowControls from './windowControls/windowControls.vue'
export default {
    components : { windowControls },
    name : "titleBar"
}
</script>
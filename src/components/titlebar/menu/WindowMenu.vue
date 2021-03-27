<template>
  <div id="window-menu">
    <div class="dropdown">
      <div class="button">File</div>
      <div class="menu-list">
        <div class="button" @click="newFile()">New File</div>
        <div class="button">Open File</div>
        <div class="button">Save File</div>
        <div class="button">Preferences</div>
        <div class="button">Quit</div>
      </div>
    </div>
    <div class="dropdown">
      <div class="button">Edit</div>
      <div class="menu-list">
        <div class="button">Undo</div>
        <div class="button">Redo</div>
        <div class="button">Cut</div>
        <div class="button">Copy</div>
        <div class="button">Paste</div>
      </div>
    </div>
    <div class="dropdown">
      <div class="button">View</div>
      <div class="menu-list">
        <div class="button">New File</div>
        <div class="button">Open File</div>
        <div class="button">Save File</div>
        <div class="button">Preferences</div>
        <div class="button">Quit</div>
      </div>
    </div>
    <div class="dropdown">
      <div class="button">Help</div>
      <div class="menu-list">
        <div class="button">New File</div>
        <div class="button">Open File</div>
        <div class="button">Save File</div>
        <div class="button">Preferences</div>
        <div class="button">Quit</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, setup } from "vue-class-component";
import { useStore } from "@/store";

export default class WindowMenu extends Vue {
  store = setup(() => useStore());

  newFile() {
    this.store.dispatch("NEW_FILE");
  }
}
</script>


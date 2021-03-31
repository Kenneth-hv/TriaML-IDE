<template>
  <div id="window-menu" tabindex="0" :class=" { active : this.active } " @click="this.active = !this.active" @blur="this.active = false">
    <div class="dropdown" :class="{ selected : this.selected == 0 }" @mouseover="selectDropdown(0)">
      <div class="button">File</div>
      <div class="menu-list">
        <div class="button" @click="newFile()">New File</div>
        <div class="spacer"></div>
        <div class="button" @click="openFile()">Open File</div>
        <div class="spacer"></div>
        <div class="button" @click="saveFile()">Save</div>
        <div class="button" @click="saveFileAs()">Save As</div>
        <div class="spacer"></div>
        <div class="button">Preferences</div>
        <div class="spacer"></div>
        <div class="button">Quit</div>
      </div>
    </div>
    <div class="dropdown" :class="{ selected : this.selected == 1 }" @mouseover="selectDropdown(1)">
      <div class="button">Edit</div>
      <div class="menu-list">
        <div class="button">Undo</div>
        <div class="button">Redo</div>
        <div class="spacer"></div>
        <div class="button">Cut</div>
        <div class="button">Copy</div>
        <div class="button">Paste</div>
      </div>
    </div>
    <div class="dropdown" :class="{ selected : this.selected == 2 }" @mouseover="selectDropdown(2)">
      <div class="button">View</div>
      <div class="menu-list">
        <div class="button" @click="zoomIn()">Zoom In</div>
        <div class="button" @click="zoomOut()">Zoom Out</div>
        <div class="button" @click="zoomDefault()">Actual Zoom</div>
      </div>
    </div>
    <div class="dropdown" :class="{ selected : this.selected == 3 }" @mouseover="selectDropdown(3)">
      <div class="button">Help</div>
      <div class="menu-list">
        <div class="button">About</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, setup } from "vue-class-component";
import { useStore } from "@/store";
import { webFrame } from "electron";

export default class WindowMenu extends Vue {
  store = setup(() => useStore());
  selected: number = -1;
  active: boolean = false;

  newFile() {
    this.store.dispatch("NEW_FILE");
  }
  openFile() {
    this.store.dispatch("OPEN_FILE");
  }
  saveFile() {
    this.store.dispatch("SAVE_FILE");
  }
  saveFileAs() {
    this.store.dispatch("SAVE_FILE_AS");
  }
  zoomIn() {
    webFrame.setZoomFactor(Math.min(webFrame.getZoomFactor() + 0.1, 1.3));
  }
  zoomOut() {
    webFrame.setZoomFactor(Math.max(webFrame.getZoomFactor() - 0.1, 0.7));
  }
  zoomDefault() {
    webFrame.setZoomFactor(1);
  }
  selectDropdown(index: number) {
    this.selected = index;
  }
}
</script>


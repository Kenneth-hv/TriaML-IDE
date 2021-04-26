<template>
  <div
    id="window-menu"
    tabindex="0"
    :class="{ active: this.active }"
    @click="this.active = !this.active"
    @blur="this.active = false"
  >
    <div
      class="dropdown"
      :class="{ selected: this.selected == 0 }"
      @mouseover="selectDropdown(0)"
    >
      <div class="button">{{ $t("menu.file") }}</div>
      <div class="menu-list">
        <div class="button" @click="newFile()">
          {{ $t("menu.file.newfile") }}
        </div>
        <div class="spacer"></div>
        <div class="button" @click="openFile()">
          {{ $t("menu.file.openfile") }}
        </div>
        <div class="spacer"></div>
        <div class="button" @click="saveFile()">
          {{ $t("menu.file.savefile") }}
        </div>
        <div class="button" @click="saveFileAs()">
          {{ $t("menu.file.savefileas") }}
        </div>
        <div class="spacer"></div>
        <div class="button">{{ $t("menu.file.preferences") }}</div>
        <div class="spacer"></div>
        <div class="button">{{ $t("menu.file.quit") }}</div>
      </div>
    </div>
    <div
      class="dropdown"
      :class="{ selected: this.selected == 1 }"
      @mouseover="selectDropdown(1)"
    >
      <div class="button">{{ $t("menu.edit") }}</div>
      <div class="menu-list">
        <div class="button">{{ $t("menu.edit.undo") }}</div>
        <div class="button">{{ $t("menu.edit.redo") }}</div>
        <div class="spacer"></div>
        <div class="button">{{ $t("menu.edit.cut") }}</div>
        <div class="button">{{ $t("menu.edit.copy") }}</div>
        <div class="button">{{ $t("menu.edit.paste") }}</div>
      </div>
    </div>
    <div
      class="dropdown"
      :class="{ selected: this.selected == 2 }"
      @mouseover="selectDropdown(2)"
    >
      <div class="button">{{ $t("menu.view") }}</div>
      <div class="menu-list">
        <div class="button" @click="zoomIn()">{{ $t("menu.view.zoomin") }}</div>
        <div class="button" @click="zoomOut()">{{ $t("menu.view.zoomout") }}</div>
        <div class="button" @click="zoomDefault()">{{ $t("menu.view.restorezoom") }}</div>
      </div>
    </div>
    <div
      class="dropdown"
      :class="{ selected: this.selected == 3 }"
      @mouseover="selectDropdown(3)"
    >
      <div class="button">{{ $t("menu.help") }}</div>
      <div class="menu-list">
        <div class="button">{{ $t("menu.help.about") }}</div>
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


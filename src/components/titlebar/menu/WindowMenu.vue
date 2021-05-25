Copyright 2021 Tecnológico de Costa Rica

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

<template>
  <div
    id="window-menu"
    tabindex="0"
    :class="{ active: this.active }"
    @click="this.active = !this.active"
    @blur="this.active = false"
  >
    <div
      v-for="(menu, index) in this.menu"
      class="dropdown"
      :class="{ selected: this.selected == index }"
      @mouseover="selectDropdown(index)"
      v-bind:key="menu.title"
    >
      <div class="button">{{ $t(menu.title) }}</div>
      <div class="menu-list">
        <div
          v-for="menu_item in menu.items"
          :class="[menu_item.title == 'spacer' ? 'spacer' : 'button']"
          @click="executeCommand(menu_item.command)"
          v-bind:key="menu_item.title"
        >
          <span v-if="menu_item.title != 'spacer'">
            {{ $t(menu_item.title) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, setup } from "vue-class-component";
import { useStore } from "@/store";
import { ipcRenderer } from "electron";
import menu_elements from "./menu";

export default class WindowMenu extends Vue {
  store = setup(() => useStore());
  selected: number = -1;
  active: boolean = false;
  menu = menu_elements;

  mounted() {
    this.menu.forEach((menu) => {
      menu.items.forEach((menu_item) => {
        if (menu_item.shortcut) {
          // Bind shorcut to the IPC SC_<shortcut>
          ipcRenderer.send("BIND_SHORTCUT", menu_item.shortcut);
          // Add listener for IPC SC_<shortcut>
          ipcRenderer.on("SC_" + menu_item.shortcut, () => {
            this.store.dispatch(menu_item.command);
          });
        }
      });
    });
  }

  executeCommand(command: string) {
    this.store.dispatch(command);
  }

  selectDropdown(index: number) {
    this.selected = index;
  }
}
</script>

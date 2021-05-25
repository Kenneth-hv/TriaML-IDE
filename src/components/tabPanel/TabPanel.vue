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
  <div class="tab-panel">
    <img :src="require('@/assets/img/logo_black.svg')" />
    <div class="tab-group">
      <Tab
        v-for="(tabFile, index) in getTabManager().tabFiles"
        :tabFile="tabFile"
        :isActive="getTabManager().selectedIndex == index"
        v-bind:key="tabFile"
        @click="setSeletedIndex(index)"
      />
    </div>
    <TabContent
      v-for="(tabFile, index) in getTabManager().tabFiles"
      :tabFile="tabFile"
      :isActive="getTabManager().selectedIndex == index"
      v-bind:key="tabFile"
    />
  </div>
</template>

<script lang="ts">
import Tab from "./Tab.vue";
import TabContent from "./TabContent.vue";
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";

@Options({
  components: { Tab, TabContent },
})
export default class TabPanel extends Vue {
  store = setup(() => useStore());
  tabName!: string;

  getTabManager() {
    return this.store.state.triaMLApp.tabFileManager;
  }

  setSeletedIndex(index: number) {
    this.store.dispatch("SET_SELECTED_INDEX", index);
  }
}
</script>

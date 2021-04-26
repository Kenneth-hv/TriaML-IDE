<template>
  <div class="tab-panel">
    <img :src="require('@/assets/logo_black.svg')" />
    <div class="tab-group">
      <Tab
        v-for="(tabFile, index) in getTabManager().tabFiles"
        :tabName="tabFile.fileName"
        :isActive="getTabManager().selectedIndex == index"
        :tabId="tabFile.id"
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

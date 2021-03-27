<template>
  <div id="tab-panel">
    <div id="tab-group" cl>
      <Tab
        v-for="(tab, index) in getTabManager().tabs"
        :tabName="tab.getFileName()"
        :isActive="getTabManager().getSelectedIndex() == index"
        v-bind:key="tab"
        @click="setSeletedIndex({index})"
      />
    </div>

    <TabContent />
  </div>
</template>

<script lang="ts">
import Tab from "./Tab.vue";
import TabContent from "./TabContent.vue";
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";

@Options({
  components: { Tab, TabContent },
  props: {
    tabName: String,
  },
  computed: {},
})
export default class TabPanel extends Vue {
  store = setup(() => useStore());
  tabName!: string;

  getTabManager() {
    return this.store.state.triaMLApp.tabManager;
  }

  setSeletedIndex(index: number) {
    this.store.dispatch("SET_SELECTED_INDEX", index);
  }
}
</script>

<template>
  <div id="tab-panel">
    <div id="tab-group" cl>
      <Tab
        v-for="tab in getTabs()" :tabName="tab.fileLocation" v-bind:key="tab.id"
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
  computed: {
  }
})
export default class TabPanel extends Vue {
  store = setup(() => useStore());
  tabName!: string;

  getTabs() {
    return this.store.state.triaMLApp.tabManager.tabs
  }

}
</script>

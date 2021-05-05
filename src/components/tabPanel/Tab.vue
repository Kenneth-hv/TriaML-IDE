<template>
  <!-- fix this -->
  <div class="tab" :class=" { active : isActive } ">
    <p>{{ tabFile.fileName }}</p>
    <img v-if="tabFile.isSaved"
      :src="require('@/assets/close_tab.svg')"
      @click="closeTab()"
      v-on:click.stop
    />
    <img v-else
      :src="require('@/assets/close_unsaved_tab.svg')"
      @click="closeTab()"
      v-on:click.stop
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";
import TabFile from "@/controllers/TabFile";

@Options({
  props: {
    tabFile: TabFile,
    isActive: Boolean
  },
})
export default class Tab extends Vue {
  store = setup(() => useStore());
  tabFile!: TabFile;

  closeTab() {
    this.store.commit("ClOSE_TAB", this.tabFile.id);
  }
}
</script>

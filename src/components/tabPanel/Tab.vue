<template>
  <!-- fix this -->
  <div class="tab" :class=" { active : isActive } ">
    <p>{{ tabName }}</p>
    <img
      :src="require('@/assets/close_tab.svg')"
      @click="closeTab()"
      v-on:click.stop
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";

@Options({
  props: {
    tabName: String,
    isActive: Boolean,
    tabId: Number
  },
})
export default class Tab extends Vue {
  store = setup(() => useStore());
  tabName!: string;
  isActive!: boolean;
  tabId!: number

  closeTab() {
    this.store.commit("ClOSE_TAB", this.tabId);
  }
}
</script>

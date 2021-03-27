<template>
  <!-- fix this -->
  <div v-if="isActive" class="tab active">
    {{ tabName }}
    <img :src="require('@/assets/close_tab.svg')" @click="closeTab()" v-on:click.stop/>
  </div>
  <div v-else class="tab">{{ tabName }}</div>
</template>


<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";

@Options({
  props: {
    tabName: String,
    isActive: Boolean,
  },
})
export default class Tab extends Vue {
  store = setup(() => useStore());
  tabName!: string;
  isActive!: boolean;

  closeTab() {
    this.store.commit('ClOSE_SELECTED_TAB');
  }
}
</script>

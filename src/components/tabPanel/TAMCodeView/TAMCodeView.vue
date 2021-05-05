<template>
  <div class="tamcode-view" :class="{ active: isActive }">
    <pre><p>{{ tabFile.tamCode }}</p></pre>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";
import TabFile from "@/controllers/TabFile";

@Options({
  props: {
    tabFile: TabFile,
    isActive: Boolean,
  },
  components: {},
})
export default class TAMCodeView extends Vue {
  store = setup(() => useStore());
  tabFile!: TabFile;
}
</script>

<style></style>

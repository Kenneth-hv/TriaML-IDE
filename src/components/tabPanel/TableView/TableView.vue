<template>
  <div class="table-view" :class="{ active: isActive }">
    <table>
      <tr>
        <th>ID</th>
        <th>Level</th>
      </tr>
      <tr v-for="row in tabFile.table" :key="row.id">
        <td>{{ row.id }}</td>
        <td>{{ row.level }}</td>
      </tr>
    </table>
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
})
export default class TableView extends Vue {
  store = setup(() => useStore());
  tabFile!: TabFile;
}
</script>

<style></style>

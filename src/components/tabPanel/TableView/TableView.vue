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
import TabFile from "@/app/TabFile";

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

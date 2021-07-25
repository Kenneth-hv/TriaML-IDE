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
  <div class="error-view" :class="{ active: isActive }">
    <table v-if="tabFile.errors">
      <tr>
        <th>Error</th>
        <th>Postition</th>
      </tr>
      <tr
        v-for="error in tabFile.errors"
        :key="error.attributes.message"
        @click="
          changePosition(
            parseInt(error.attributes.row),
            parseInt(error.attributes.column)
          )
        "
      >
        <td>{{ error.attributes.message }}</td>
        <td>
          Column: {{ error.attributes.row }} Row: {{ error.attributes.column }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";
import TabFile from "@/app/TabFile";
import { Tool } from "@/app/TriaML";

@Options({
  props: {
    tabFile: TabFile,
    isActive: Boolean,
  },
})
export default class ErrorView extends Vue {
  store = setup(() => useStore());
  tabFile!: TabFile;

  changePosition(row: number, column: number) {
    this.store.dispatch("SET_SELECTED_TOOL", Tool.CODE_EDITOR);
    this.tabFile.changePosition(row, column);
  }
}
</script>

<style></style>

<template>
  <FloatingPanel v-if="isActive()">
    <template v-slot:header>
      Preferences
    </template>
    <template v-slot:content>
      <div class="preferences">
        <div
          class="category"
          v-for="(category, category_name) in getApp().config"
          :key="category_name"
        >
          <h3>{{ $t(`config.${category_name}`) }}</h3>
          <div
            class="setting"
            v-for="(setting, setting_name) in category"
            :key="setting_name"
          >
            <span>{{ $t(`config.${category_name}.${setting_name}`) }}</span>

            <!-- String setting using v-model -->
            <div v-if="setting.type == 'string'" class="string-setting">
              <input spellcheck="false" v-model="setting.value" />
            </div>

            <!-- Select setting using v-model -->
            <div v-else-if="setting.type == 'select'" class="select-setting">
              <select v-model="setting.selected" @change="update()">
                <option v-for="value in setting.options" :key="value">{{
                  value
                }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <button @click="close()">{{ $t("close") }}</button>
    </template>
  </FloatingPanel>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "@/store";
import FloatingPanel from "./FloatingPanel.vue";

@Options({
  components: { FloatingPanel },
  emits: ["update_preferences"],
})
export default class Preferences extends Vue {
  store = setup(() => useStore());
  needsReload = false;

  update(): void {
    this.store.commit("SAVE_PREFERENCES");
    this.$emit("update_preferences");
  }

  close() {
    this.update();
    this.store.commit("CLOSE_PREFERENCES");
  }

  isActive() {
    return this.store.state.triaMLApp.showPreferences;
  }

  getApp() {
    return this.store.state.triaMLApp;
  }
}
</script>

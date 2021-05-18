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
              <select v-model="setting.selected" >
                <option v-for="value in setting.available" :key="value">{{
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
})
export default class Preferences extends Vue {
  store = setup(() => useStore());
  needsReload = false;

  reload() {
    window.location.reload();
  }

  close() {
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

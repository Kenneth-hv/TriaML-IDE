<template>
  <FloatingPanel v-if="isActive()">
    <template v-slot:header>{{$t("about.title")}}</template>
    <template v-slot:content>
      <div class="about">
        <img src="@/assets/img/logo.png" />
        <div class="about-info">
          <h2>TriaML IDE</h2>
          <h4>{{$t("about.version")}} {{ version }}</h4>
          <span>Tecnológico de Costa Rica</span><br />
          <h5>{{$t("about.authors")}}</h5>
          <span>Kenneth Herrera</span><br />
          <span>Esteban Jiménez</span><br />
          <span>Jose Daniel Jiménez</span><br />
          <span>Esteban Mata</span><br />
          <h5>{{$t("about.bugreports")}}</h5>
          <span class="link" @click="openReportIssue()">Github Report Issue</span><br />
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
import { ipcRenderer } from "electron";
import FloatingPanel from "./FloatingPanel.vue";

@Options({
  components: { FloatingPanel },
})
export default class About extends Vue {
  store = setup(() => useStore());
  version: string = "0.3.0";

  close() {
    this.store.commit("CLOSE_ABOUT");
  }

  isActive() {
    return this.store.state.triaMLApp.showAbout;
  }

  openReportIssue() {
    ipcRenderer.send("OPEN_EXTERNAL", "https://github.com/Kenneth-hv/TriaML-IDE/issues");
  }
}
</script>

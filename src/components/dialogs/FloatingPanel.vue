<template>
  <FloatingPanelBackground>
    <div class="floating-panel">
      <div class="header drag-region">
        <slot name="header"></slot>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </FloatingPanelBackground>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import FloatingPanelBackground from "./FloatingPanelBackground.vue";

@Options({
  props: {
    isActive: Boolean,
  },
  components: { FloatingPanelBackground },
})
export default class FloatingPanel extends Vue {}
</script>

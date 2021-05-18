<template>
  <div class="floating-panel-bg">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    isActive: Boolean,
  },
})
export default class FloatingPanelBackground extends Vue {}
</script>

<template>
  <div class="toolbar-button">
    <img class="toolbar-item-icon" :src="require(`@/assets/${iconName}.png`)" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    iconName: String
  }
})
export default class ToolbarButton extends Vue {
    iconName!: string
}
</script>
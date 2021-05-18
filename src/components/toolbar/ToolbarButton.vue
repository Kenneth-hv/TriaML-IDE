<template>
  <div class="toolbar-button">
    <img :src="require(`@/assets/img/${iconName}.svg`)" />
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
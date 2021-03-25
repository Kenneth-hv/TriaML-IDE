<template>
  <div
    class="button"
    :id="id"
  >
    <img
      class="icon"
      :src="require(`@/assets/control/${iconName}-w-10.png`)"
      draggable="false"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    id: String,
    iconName: String,
  }
})
export default class WindowButton extends Vue {
  id!: string;
  iconName!: string;
}
</script>
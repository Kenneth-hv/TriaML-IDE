<template>
  <div class="toolbar-button">
    <img class="toolbar-item-icon" :src="require(`@/assets/${iconName}.png`)" />
  </div>
</template>

<script>
export default {
  name: "toolbarButton",
  props: {
    iconName: String,
  }
};
</script>
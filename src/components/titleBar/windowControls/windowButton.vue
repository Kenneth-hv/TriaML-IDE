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

<script>
export default {
  name: "windowButton",
  props: {
    id: String,
    iconName: String,
  }
};
</script>
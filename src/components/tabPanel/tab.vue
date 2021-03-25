<template>
    <div v-if=isActive class="tab active">{{tabName}}</div>
    <div v-else class="tab">{{tabName}}</div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    tabName: String,
    isActive: Boolean
  }
})
export default class Tab extends Vue {
    tabName!: string;
    isActive!: boolean;
}
</script>

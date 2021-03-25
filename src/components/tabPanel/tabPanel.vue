<template>
  <div id="tab-panel">
    <div id="tab-group">
      <Tab tabName="hola.tri"  v-bind:isActive="true" />
      <Tab tabName="hola.tri" />
    </div>

    <tabContent />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Tab from './Tab.vue'
import TabContent from './TabContent.vue'

@Options({
  components : { Tab, TabContent },
  props: {
    tabName: String
  }
})
export default class TabPanel extends Vue {
    tabName!: string
}
</script>

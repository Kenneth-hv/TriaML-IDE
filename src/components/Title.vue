<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: ["title"],
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = this.title;
      },
    },
  },
  render() {},
})
export default class Title extends Vue {
}
</script>

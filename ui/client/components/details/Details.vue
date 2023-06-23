<template>
  <div>This is the details page {{ routeParams }}</div>
</template>

<script>
import SearchResults from "../shared/table/SearchResults";
import Loading from "../shared/Loading";
import { mapState } from "vuex";

export default {
  components: { SearchResults, Loading },
  props: {},
  data() {
    return {
      routeParams: this.$route.params
    };
  },
  watch: {
    routeParamsComputed() {
      this.routeParams = this.routeParamsComputed;
    }
  },
  computed: {
    routeParamsComputed() {
      return this.$route.params;
    },
    ...mapState("search", ["results", "selection", "loading"])
  }
};
</script>

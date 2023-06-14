<template>
  <div>
    <div v-if="loading">loading search results</div>
    <SearchResults v-else-if="results" :results="results" />
  </div>
</template>

<script>
import SearchResults from "../shared/table/SearchResults";
import { mapState } from "vuex";

export default {
  components: { SearchResults },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("search", ["results", "selection", "loading"])
  }
};
</script>

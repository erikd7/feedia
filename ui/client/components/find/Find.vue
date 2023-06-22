<template>
  <div>
    <Loading v-if="loading" message="Loading search results..." />
    <SearchResults v-else-if="results" :results="results" />
  </div>
</template>

<script>
import SearchResults from "../shared/table/SearchResults";
import Loading from "../shared/Loading";
import { mapState } from "vuex";

export default {
  components: { SearchResults, Loading },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("search", ["results", "selection", "loading"])
  }
};
</script>

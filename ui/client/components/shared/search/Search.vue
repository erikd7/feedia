<template>
  <SearchBar
    :inputId="inputId"
    :liveSearch="search"
    :items="results"
    :hideResultsPanel="isInFullPageSearch"
    :placeholder="searchPlaceholder"
    ref="search-bar"
  >
    <template v-slot:option="slotProps">
      <Option :option="slotProps.option.option" />
    </template>
  </SearchBar>
</template>

<script>
import SearchBar from "./SearchBar";
import Option from "./Option";
import { mapActions, mapState, mapGetters } from "vuex";
import { ROUTES } from "../../../util/constants/navigation";
import { getSearchTerms } from "../../../util/constants/base";
import aggregateSearch from "../../../util/fetch/search";

export default {
  components: { SearchBar, Option },
  props: {
    inputId: {
      type: String
    }
  },
  computed: {
    ...mapState("search", ["results"]),
    ...mapState(["currentMediaTypes"]),
    ...mapGetters(["currentMediaTypesHash"]),
    ...mapGetters("navigation", ["currentRoute"]),
    isInFullPageSearch() {
      return [ROUTES.FIND, ROUTES.SEARCH].includes(this.currentRoute);
    },
    searchPlaceholder() {
      return getSearchTerms(this.currentMediaTypes);
    }
  },
  methods: {
    ...mapActions("search", ["setResults", "setSelection", "setLoading"]),
    async search(queryString) {
      this.setLoading(true);
      this.setSelection(queryString);
      try {
        const results = await aggregateSearch(
          queryString,
          this.currentMediaTypes,
          this.currentMediaTypesHash,
          this.isInFullPageSearch
        );
        //Set the results in Vuex which are passed to Autocomplete items
        this.setResults(results);
      } catch (e) {
        console.log(`Error with search:`, e.message);
        throw Error(e);
      } finally {
        this.setLoading(false);
      }
    }
  }
};
</script>

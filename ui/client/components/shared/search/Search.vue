<template>
  <SearchBar
    :inputId="inputId"
    :liveSearch="search"
    :items="results"
    :updateItems="updateItems"
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
import aggregateSearch from "../../../util/search";

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
    ...mapActions("search", ["setResults", "setSelection"]),
    async search(queryString) {
      this.setSelection(queryString);
      try {
        const results = await aggregateSearch(
          this.currentMediaTypesHash,
          queryString,
          this.isInFullPageSearch
        );
        //Set the results in Vuex which are passed to Autocomplete items
        this.setResults(results);
      } catch (e) {
        console.log(`Error with search:`, e.message);
        throw Error(e);
      }
    },
    updateItems(_currentItems, searchResult) {
      try {
        this.setResults(searchResult.data.items);
        return newItems;
      } catch (e) {
        console.log(`Error with updating search items:`, e.message);
      }
    }
  }
};
</script>

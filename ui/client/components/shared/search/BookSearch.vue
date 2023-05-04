<template>
  <SearchBar
    :liveSearch="search"
    :items="results"
    :updateItems="updateItems"
    :optionLabel="getLabel"
  >
    <template v-slot:option="slotProps">
      <BookOption :option="slotProps.option.option" />
    </template>
  </SearchBar>
</template>

<script>
import SearchBar from "./SearchBar";
import BookOption from "./BookOption";
import { searchBooks } from "../../../http-clients/google";
import { mapActions, mapGetters } from "vuex";
import { httpToItems, resultToSearchLabel } from "../../../util/mapping/book";

export default {
  components: { SearchBar, BookOption },
  computed: {
    ...mapGetters("search", { results: "formattedResults" })
  },
  methods: {
    ...mapActions("search", ["setResults", "setSelection"]),
    async search(queryString) {
      this.setSelection(queryString);
      try {
        const result = await searchBooks(queryString);
        if (!result.ok) {
          throw Error(result.message);
        }

        //Set the results in Vuex which are passed to Autocomplete items
        this.setResults(httpToItems(result));
      } catch (e) {
        console.log(`Error with search:`, e.message);
      }
    },
    updateItems(_currentItems, searchResult) {
      try {
        this.setResults(searchResult.data.items);
        return newItems;
      } catch (e) {
        console.log(`Error with updating search items:`, e.message);
      }
    },
    getLabel: resultToSearchLabel
  }
};
</script>

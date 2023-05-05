<template>
  <SearchBar :liveSearch="search" :items="results" :updateItems="updateItems">
    <template v-slot:option="slotProps">
      <BookOption :option="slotProps.option.option" />
    </template>
  </SearchBar>
</template>

<script>
import SearchBar from "./SearchBar";
import BookOption from "./BookOption";
import OpenlibraryClient from "../../../classes/open-library";
import { mapActions, mapState } from "vuex";

export default {
  components: { SearchBar, BookOption },
  computed: {
    ...mapState("search", ["results"])
  },
  methods: {
    ...mapActions("search", ["setResults", "setSelection"]),
    async search(queryString) {
      this.setSelection(queryString);
      try {
        const books = await OpenlibraryClient.subComponentSearch(queryString);

        //Set the results in Vuex which are passed to Autocomplete items
        this.setResults(books);
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
    }
  }
};
</script>

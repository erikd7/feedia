<template>
  <div>
    <SearchBar
      :liveSearch="search"
      :updateItems="updateItems"
      :optionLabel="getLabel"
    >
      <template v-slot:option="slotProps">
        <BookOption :option="slotProps.option.option" />
      </template>
    </SearchBar>
  </div>
</template>

<script>
import SearchBar from "./SearchBar";
import BookOption from "./BookOption";
import { searchBooks } from "../../../http-clients/google";
import { mapActions } from "vuex";

export default {
  components: { SearchBar, BookOption },
  props: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions("search", ["setResults", "setSelection"]),
    search(queryString) {
      this.setSelection(queryString);
      try {
        return searchBooks(queryString);
      } catch (e) {}
    },
    updateItems(_currentItems, searchResult) {
      try {
        const newItems = searchResult.data.items.map(i => ({
          title: i.volumeInfo.title,
          authors: i.volumeInfo.authors,
          publishedDate: i.volumeInfo.publishedDate
        }));
        this.setResults(newItems);
        return newItems;
      } catch (e) {}
    },
    getLabel(book) {
      return `${book.title}${
        book.authors ? ` - ${book.authors?.slice(0, 2).join(", ")}` : ""
      }`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

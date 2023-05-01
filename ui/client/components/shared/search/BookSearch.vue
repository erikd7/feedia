<template>
  <div>
    <SearchBar
      :liveSearch="search"
      :updateItems="updateItems"
      :optionLabel="getLabel"
    />
  </div>
</template>

<script>
import SearchBar from "./SearchBar";
import { searchBooks } from "../../../http-clients/google";

export default {
  components: { SearchBar },
  props: {},
  data() {
    return {};
  },
  methods: {
    search(queryString) {
      try {
        return searchBooks(queryString);
      } catch (e) {}
    },
    updateItems(_currentItems, searchResult) {
      try {
        const newItems = searchResult.data.items.map(i => ({
          title: i.volumeInfo.title,
          authors: i.volumeInfo.authors
        }));
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

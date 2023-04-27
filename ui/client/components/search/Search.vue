<template>
  <div>
    <div>Search Page!</div>
    <SearchBar />
  </div>
</template>

<script>
import SearchBar from "./SearchBar";
import { searchBooks } from "../../http-clients/google";

export default {
  components: { SearchBar },
  props: {},
  data() {
    return {
      myData: "nothing"
    };
  },
  methods: {
    search() {
      try {
        searchBooks("jonathan+strange+mr+norrell");
      } catch (e) {}
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

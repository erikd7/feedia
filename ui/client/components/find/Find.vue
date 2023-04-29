<template>
  <div>
    <div>Search results Page!</div>
    <BookSearch />
  </div>
</template>

<script>
import BookSearch from "../shared/search/BookSearch";
import { searchBooks } from "../../http-clients/google";

export default {
  components: { BookSearch },
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

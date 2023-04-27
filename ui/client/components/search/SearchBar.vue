<template
  ><button @click="search">This is the search{{ myData }}</button></template
>

<script>
import { searchBooks } from "../../http-clients/google";

export default {
  components: {},
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

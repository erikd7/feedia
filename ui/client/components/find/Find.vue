<template>
  <div>
    <BookTable :books="results" />
  </div>
</template>

<script>
import BookTable from "../shared/table/BookTable";
import { mapState } from "vuex";

export default {
  components: { BookTable },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("search", ["results", "selection"])
  }
};
</script>

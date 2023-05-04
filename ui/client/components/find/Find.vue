<template>
  <div>
    <div class="text-center">Search results Page!</div>
    <Table :rows="formattedResults" />
  </div>
</template>

<script>
import Table from "../shared/table/Table";
import { mapState, mapGetters } from "vuex";

export default {
  components: { Table },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("search", ["results", "selection"]),
    ...mapGetters("search", ["formattedResults"])
  }
};
</script>

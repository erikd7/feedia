<template>
  <div>
    <div class="text-center">Search results Page!</div>
    <Table :rows="results" />
  </div>
</template>

<script>
import Table from "../shared/table/Table";
import { mapState } from "vuex";

export default {
  components: { Table },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("search", ["results", "selection"])
  }
};
</script>

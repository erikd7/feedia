<template>
  <div>
    This is the details page
    <div>props: {{ mediaType }} - {{ id }}</div>
    <div>router state: {{ $route.params }}</div>
    now we can create mediatype-specific details pages
    <div>and selected is {{ JSON.stringify(selected) }}</div>
  </div>
</template>

<script>
import SearchResults from "../shared/table/SearchResults";
import Loading from "../shared/Loading";
import { mapGetters } from "vuex";

export default {
  components: { SearchResults, Loading },
  props: {
    mediaType: {
      type: String,
      required: true
    },
    id: {
      type: String
    }
  },
  data() {
    return {};
  },
  computed: { ...mapGetters("details", ["selected"]) }
};
</script>

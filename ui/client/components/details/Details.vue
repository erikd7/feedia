<template>
  <MediaTypeSwitcher
    class="text-main"
    :mediaType="mediaType"
    :componentsByMediaType="componentsByMediaType"
    :passedProps="{ id, [mediaType.toLowerCase()]: selected }"
  />
</template>

<script>
import SearchResults from "../shared/table/SearchResults";
import Loading from "../shared/Loading";
import MediaTypeSwitcher from "../shared/media-type/MediaTypeSwitcher.vue";
import BookDetails from "./BookDetails";
import MovieDetails from "./MovieDetails";
import { MEDIA_TYPES } from "../../util/constants/base";
import { mapGetters } from "vuex";

export default {
  components: { SearchResults, Loading, MediaTypeSwitcher },
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
  computed: {
    ...mapGetters("details", ["selected"]),
    componentsByMediaType() {
      return {
        [MEDIA_TYPES.BOOK]: BookDetails,
        [MEDIA_TYPES.MOVIE]: MovieDetails
      };
    }
  },
  created() {
    //Retrieve details if they aren't already set
    //TODO
  }
};
</script>

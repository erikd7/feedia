<template>
  <SearchBar
    :inputId="inputId"
    :liveSearch="search"
    :items="results"
    :hideResultsPanel="isInFullPageSearch"
    :placeholder="searchPlaceholder"
    ref="search-bar"
  >
    <template v-slot:option="slotProps">
      <MediaTypeSwitcher
        :mediaType="slotProps.option.option.mediaType"
        :componentsByMediaType="componentsByMediaType"
        :passedProps="{
          [slotProps.option.option.mediaType.toLowerCase()]:
            slotProps.option.option,
          showMediaType
        }"
      />
    </template>
  </SearchBar>
</template>

<script>
import SearchBar from "./SearchBar";
import { mapActions, mapState, mapGetters } from "vuex";
import { ROUTES } from "../../../util/constants/navigation";
import { getSearchTerms, MEDIA_TYPES } from "../../../util/constants/base";
import aggregateSearch from "../../../util/fetch/search";
import BookOption from "../../book/BookOption.vue";
import MovieOption from "../../movie/MovieOption.vue";
import MediaTypeSwitcher from "../media-type/MediaTypeSwitcher.vue";

export default {
  components: { SearchBar, MediaTypeSwitcher },
  props: {
    inputId: {
      type: String
    }
  },
  computed: {
    ...mapState("search", ["results"]),
    ...mapState(["currentMediaTypes"]),
    ...mapGetters(["currentMediaTypesHash"]),
    ...mapGetters("navigation", ["currentRoute"]),
    isInFullPageSearch() {
      return [ROUTES.FIND, ROUTES.SEARCH].includes(this.currentRoute);
    },
    searchPlaceholder() {
      return getSearchTerms(this.currentMediaTypes);
    },
    componentsByMediaType() {
      return {
        [MEDIA_TYPES.BOOK]: BookOption,
        [MEDIA_TYPES.MOVIE]: MovieOption
      };
    },
    showMediaType() {
      return this.currentMediaTypes?.length > 1; //Show media type options if there are multiple media types
    }
  },
  methods: {
    ...mapActions("search", ["setResults", "setSelection", "setLoading"]),
    async search(queryString) {
      this.setLoading(true);
      this.setSelection(queryString);
      try {
        const results = await aggregateSearch(
          queryString,
          this.currentMediaTypes,
          this.currentMediaTypesHash,
          this.isInFullPageSearch
        );
        //Set the results in Vuex which are passed to Autocomplete items
        this.setResults(results);
      } catch (e) {
        console.log(`Error with search:`, e.message);
        throw Error(e);
      } finally {
        this.setLoading(false);
      }
    }
  }
};
</script>

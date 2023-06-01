<template>
  <div class="self-baseline">
    <MagnifyingGlassCircleIcon class="search-icon" @click="toggleSearchBar" />
    <template :class="{ 'search-bar-display': !showSearchBar }">
      <BookSearch :inputId="NAV_BAR_SEARCH_INPUT_ID"
    /></template>
  </div>
</template>

<script>
import { MagnifyingGlassCircleIcon } from "@heroicons/vue/24/solid";
import BookSearch from "../shared/search/BookSearch";
import { NAV_BAR_SEARCH_INPUT_ID } from "../../util/constants/navigation";

export default {
  components: { BookSearch, MagnifyingGlassCircleIcon },
  data() {
    return {
      showSearchBar: true
    };
  },
  computed: {
    NAV_BAR_SEARCH_INPUT_ID() {
      return NAV_BAR_SEARCH_INPUT_ID;
    }
  },
  methods: {
    toggleSearchBar() {
      this.showSearchBar = !this.showSearchBar;
    }
  }
};
</script>

<style>
.search-icon {
  display: none;
}
.search-bar-display {
  display: block;
}
@media only screen and (max-width: 400px) {
  .search-icon {
    display: block;
    color: white;
    background-color: #60789e;
    cursor: pointer;
    border-radius: 50%;
    width: 30px;
  }
  .search-bar-display {
    display: none !important;
  }
}
</style>

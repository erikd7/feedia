<template>
  <div class="self-baseline flex flex-row" :class="{ 'w-full': showSearchBar }">
    <MagnifyingGlassCircleIcon
      class="search-icon self-end"
      @click="handleSearchIconClick"
    />
    <div
      v-click-away="() => setShowSearchBar(false)"
      class="search-bar"
      :class="{ 'mobile-hide': !showSearchBar }"
    >
      <BookSearch ref="search-component" :inputId="NAV_BAR_SEARCH_INPUT_ID" />
    </div>
  </div>
</template>

<script>
import { MagnifyingGlassCircleIcon } from "@heroicons/vue/24/solid";
import BookSearch from "../shared/search/BookSearch";
import { NAV_BAR_SEARCH_INPUT_ID } from "../../util/constants/navigation";
import { mixin as clickaway } from "vue3-click-away";

export default {
  components: { BookSearch, MagnifyingGlassCircleIcon },
  props: {
    showSearchBar: {
      type: Boolean,
      default: false
    },
    setShowSearchBar: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    NAV_BAR_SEARCH_INPUT_ID() {
      return NAV_BAR_SEARCH_INPUT_ID;
    }
  },
  methods: {
    toggleSearchBar() {
      this.setShowSearchBar(!this.showSearchBar);
    },
    focusSearch() {
      this.$refs["search-component"].$refs["search-bar"].$refs[
        "autocomplete"
      ].$refs[NAV_BAR_SEARCH_INPUT_ID].focus();
    },
    handleSearchIconClick() {
      this.toggleSearchBar();
      console.log(
        `refs are`,
        this.$refs["search-component"].$refs["search-bar"].$refs["autocomplete"]
          .$refs[NAV_BAR_SEARCH_INPUT_ID]
      ); /* //!DELETE */
      this.focusSearch();
    }
  },
  mixins: [clickaway]
};
</script>

<style scoped>
.search-icon {
  display: block;
  color: white;
  background-color: #60789e;
  cursor: pointer;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: none;
}
@media only screen and (max-width: 400px) {
  .search-icon {
    display: inline-block;
  }
  .search-bar {
    order: -1;
    width: 100%;
    padding-right: 5px;
    flex-grow: 2;
  }
}
</style>

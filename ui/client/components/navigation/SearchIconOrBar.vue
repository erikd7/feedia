<template>
  <div
    v-click-away="handleSearchBarClickAway"
    class="self-baseline flex flex-row"
    :class="{ 'w-full': showSearchBar }"
  >
    <MagnifyingGlassCircleIcon
      class="search-icon self-end"
      @click="handleSearchIconClick"
    />
    <div class="search-bar" :class="{ 'mobile-hide': !showSearchBar }">
      <BookSearch ref="search-component" :inputId="NAV_BAR_SEARCH_INPUT_ID" />
    </div>
  </div>
</template>

<script>
import { MagnifyingGlassCircleIcon } from "@heroicons/vue/24/solid";
import BookSearch from "../shared/search/BookSearch";
import { NAV_BAR_SEARCH_INPUT_ID } from "../../util/constants/navigation";
import { DomHandler } from "primevue/utils";

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
      //Both of these execute without error but neither works :/
      DomHandler.focus(
        this.$refs["search-component"].$refs["search-bar"].$refs["autocomplete"]
          .$refs.focusInput
      );
      this.$refs["search-component"].$refs["search-bar"].$refs[
        "autocomplete"
      ].$refs.focusInput.focus();
    },
    handleSearchIconClick(event) {
      event.preventDefault();
      event.stopPropagation();
      this.toggleSearchBar();
      this.focusSearch();
    },
    handleSearchBarClickAway(event) {
      event.preventDefault();
      event.stopPropagation();
      this.setShowSearchBar(false);
    }
  }
};
</script>

<style scoped>
.search-icon {
  display: block;
  flex-shrink: 0;
  color: white;
  background-color: #60789e;
  cursor: pointer;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: none;
}
@media only screen and (max-width: var(--mobile-breakpoint)) {
  .search-icon {
    display: inline-block;
    align-self: auto;
  }
  .search-bar {
    order: -1;
    width: 100%;
    padding-right: 5px;
    flex-grow: 2;
  }
}
</style>

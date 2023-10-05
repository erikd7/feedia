<template>
  <div class="nav-bar" @click="toggleExpanded">
    <Menu
      :sections="sections"
      :current="current"
      :class="{ 'mobile-hide': showSearchBar }"
    />
    <MediaTypeToggle :class="{ 'mobile-hide': showSearchBar }" />
    <div class="flex flex-row self-baseline">
      <SearchIconOrBar
        :showSearchBar="showSearchBar"
        :setShowSearchBar="setShowSearchBar"
      />
      <UserInfo v-if="!showSearchBar" />
    </div>
  </div>
</template>

<script>
import Menu from "./Menu";
import MediaTypeToggle from "./MediaTypeToggle";
import SearchIconOrBar from "./SearchIconOrBar";
import UserInfo from "../login/UserInfo.vue";

export default {
  components: { Menu, SearchIconOrBar, MediaTypeToggle, UserInfo },
  data() {
    return { showSearchBar: false };
  },
  props: {
    sections: {
      type: Array,
      default: () => [{ name: "Feed", path: "/" }]
    },
    current: {
      type: String,
      default: "/"
    },
    toggleExpanded: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    isCurrent(path) {
      return path === this.current;
    },
    setShowSearchBar(showSearchBar) {
      this.showSearchBar = showSearchBar;
    }
  }
};
</script>

<style>
.nav-bar {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}
.menu {
  display: flex;
  flex-flow: row;
  justify-content: left;
  overflow-x: hidden;
  overflow-y: hidden;
}
.menu-item {
  color: black;
  border-radius: 5px;
  padding: 5px;
}
.menu-item:hover {
  color: white;
  background-color: #60789e;
  cursor: pointer;
}
.menu-item-selected {
  color: white !important;
  background-color: #60789e;
  cursor: pointer;
}
.search-bar-container {
  flex-basis: 50%;
  max-width: 24rem;
}
@media only screen and (max-width: 767px /*mobile-breakpoint*/) {
  .menu-pane-expanded {
    max-height: 300px !important;
  }
  .menu {
    flex-flow: column;
  }
  .nav-bar {
    flex-flow: row;
    align-items: center;
  }
  .search-bar-container {
    width: 100%;
  }
  .sort-item-top {
    order: -1 !important;
  }
}
</style>

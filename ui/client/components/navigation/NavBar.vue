<template>
  <div class="nav-bar" @click="toggleExpanded">
    <Menu :sections="sections" :current="current" />
    <BookSearch
      :inputId="NAV_BAR_SEARCH_INPUT_ID"
      class="search-bar-container"
    />
  </div>
</template>

<script>
import Menu from "./Menu";
import BookSearch from "../shared/search/BookSearch";
import { NAV_BAR_SEARCH_INPUT_ID } from "../../util/constants/navigation";

export default {
  components: { Menu, BookSearch },
  data() {
    return {};
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
  computed: {
    NAV_BAR_SEARCH_INPUT_ID() {
      return NAV_BAR_SEARCH_INPUT_ID;
    }
  },
  methods: {
    isCurrent(path) {
      return path === this.current;
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
@media only screen and (max-width: 400px) {
  .menu-pane,
  .nav-bar {
    transition: all 0.5s;
  }
  .menu-pane-expanded {
    max-height: 300px !important;
  }
  .menu,
  .nav-bar {
    flex-flow: column;
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

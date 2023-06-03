<template>
  <div>
    <div class="menu">
      <div
        v-for="section in sections"
        :key="section.path"
        class="menu-item-spacer"
        :class="{
          'sort-item-top': isCurrent(section.name),
          'mobile-opaque': !isCurrent(section.name) && !navExpanded
        }"
      >
        <router-link :to="section.path">
          <div
            class="menu-item"
            :class="{
              'menu-item-selected': isCurrent(section.name)
            }"
            style="--scale: 1.01"
          >
            {{ section.name }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
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
    }
  },
  computed: {
    ...mapState("navigation", ["navExpanded"])
  },
  methods: {
    isCurrent(name) {
      return name === this.current;
    }
  }
};
</script>

<style>
.menu {
  display: flex;
  flex-flow: row;
  justify-content: left;
  overflow-x: hidden;
  overflow-y: hidden;
}
.menu-item-spacer {
  margin: 0px 5px;
  width: fit-content;
  transition: all 0.5s;
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
@media only screen and (max-width: 767px /*mobile-breakpoint*/) {
  .menu-pane {
    transition: all 0.5s;
  }
  .menu-pane-expanded {
    max-height: 300px !important;
  }
  .menu {
    flex-flow: column;
    align-items: start;
  }
  .menu-item-spacer {
    width: fit-content;
  }
  .sort-item-top {
    order: -1 !important;
  }
}
</style>

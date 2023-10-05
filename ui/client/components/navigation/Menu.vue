<template>
  <div>
    <div class="menu">
      <div
        v-for="section in filteredSections"
        :key="section.path"
        class="mobile-hide menu-item-spacer"
        :class="{
          'sort-item-top': isCurrent(section.name),
          'mobile-opaque': !isCurrent(section.name)
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
      <div class="mobile-show">
        <div
          class="menu-item menu-item-selected"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        >
          {{ current }}
        </div>
        <PrimevueMenu
          ref="menu"
          id="overlay_menu"
          :model="menuOptions"
          :popup="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PrimevueMenu from "primevue/menu";

export default {
  components: { PrimevueMenu },
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
    filteredSections() {
      return this.sections.filter(s => !s.hideTab);
    },
    menuOptions() {
      return this.filteredSections
        .filter(s => !this.isCurrent(s.name))
        .map(section => ({
          label: section.name,
          command: () => this.routeTo(section.path)
        }));
    }
  },
  methods: {
    isCurrent(name) {
      return name === this.current;
    },
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    routeTo(path) {
      this.$router.push(path);
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

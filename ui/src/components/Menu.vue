<template>
  <div>
    <div class="menu" @click="toggleExpanded">
      <div
        v-for="section in sections"
        :key="section.path"
        class="menu-item-spacer"
        :class="{ 'sort-item-top': isCurrent(section.path) }"
      >
        <router-link :to="section.path">
          <div
            class="menu-item"
            :class="{
              'menu-item-selected': isCurrent(section.path)
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
export default {
  data() {
    return {};
  },
  props: {
    sections: {
      type: Array,
      default: () => [{ name: "Home", path: "/" }]
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
    }
  }
};
</script>

<style>
.menu {
  display: flex;
  flex-flow: row;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: hidden;
}
.menu-item-spacer {
  margin-left: 10px;
  margin-right: 10px;
  width: fit-content;
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
@media only screen and (max-width: 400px) {
  .menu-pane {
    transition: all 0.5s;
  }
  .menu-pane-expanded {
    max-height: 300px !important;
  }
  .menu {
    flex-flow: column;
    align-items: center;
  }
  .menu-item-spacer {
    width: fit-content;
  }
  .sort-item-top {
    order: -1 !important;
  }
}
</style>

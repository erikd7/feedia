<template>
  <div>
    <div
      class="ml-2"
      v-if="menuItems?.length"
      v-click-away="hideMenu"
      @mouseleave="hideMenu"
      @click="stopEvent"
    >
      <Kebab @click="toggleShowMenu" />
      <TieredMenu v-if="erikThing.showMenu" :model="menus" />
    </div>
  </div>
</template>

<script>
import TieredMenu from "primevue/tieredmenu";
import Kebab from "../../shared/menu/Kebab.vue";
import { stopEvent } from "../../../util/event";

export default {
  data() {
    return {
      erikThing: {},
      menus: []
    };
  },
  props: {
    //Type should be one of the classes from the helper
    type: {
      type: Function,
      required: true
    },
    actionConfig: {
      type: Object,
      required: true
    }
  },
  components: { TieredMenu, Kebab },
  computed: {
    menuItems() {
      if (this.erikThing.menuItems) {
        return this.erikThing.menuItems();
      }
    }
  },
  methods: {
    stopEvent,
    hideMenu() {
      this.erikThing.hideMenu();
    },
    toggleShowMenu() {
      this.erikThing.toggleShowMenu();
    }
  },
  watch: {
    erikThing: {
      deep: true,
      handler(newVal, oldVal) {
        this.menus = this.erikThing.menuItems();
      }
    }
  },
  mounted() {
    //Initialize config class
    this.erikThing = this.type.build(this.actionConfig, this);
    this.erikThing.onMount()();
  }
};
</script>
<style scoped>
:deep(.p-tieredmenu),
:deep(.p-menuitem-link) {
  padding: 0 !important;
}
:deep(.p-menuitem-content) {
  padding: 4px !important;
}
:deep(.p-submenu-list) {
  border-radius: 8px;
}
</style>

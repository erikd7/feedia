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
      <TieredMenu v-if="showMenu" :model="menuItems" />
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
      showMenu: false
    };
  },
  props: {
    actionConfig: {
      type: Object,
      required: true
    }
  },
  components: { TieredMenu, Kebab },
  computed: {
    menuItems() {
      return this.actionConfig.menuItems();
    }
  },
  methods: {
    stopEvent,
    hideMenu() {
      this.actionConfig.hideMenu();
    },
    toggleShowMenu() {
      this.actionConfig.toggleShowMenu();
    }
  },
  mounted() {
    //Hook showMenu state into class
    this.actionConfig.setupShowMenu(
      () => this.showMenu,
      value => (this.showMenu = value)
    );

    //Run the class's onMount methods
    this.actionConfig.onMount()();
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

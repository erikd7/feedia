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
      <TieredMenu v-if="actionBarConfig.showMenu" :model="menus" />
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
      actionBarConfig: {},
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
      if (this.actionBarConfig.menuItems) {
        return this.actionBarConfig.menuItems();
      }
    }
  },
  methods: {
    stopEvent,
    hideMenu() {
      this.actionBarConfig.hideMenu();
    },
    toggleShowMenu() {
      this.actionBarConfig.toggleShowMenu();
    }
  },
  watch: {
    actionBarConfig: {
      deep: true,
      handler() {
        this.menus = this.actionBarConfig.menuItems();
      }
    }
  },
  mounted() {
    //Initialize config class
    this.actionBarConfig = this.type.build(this.actionConfig, this);
    this.actionBarConfig.onMount()();
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

<template>
  <div>
    show menu is {{ showMenu }}
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
  props: {
    actionConfig: {
      type: Object,
      required: true
    }
  },
  components: { TieredMenu, Kebab },
  computed: {
    showMenu() {
      return this.actionConfig.getShowMenu();
    },
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
      console.log(
        `gonna show menu`,
        this.actionConfig.showMenu
      ); /* //!DELETE */
      this.actionConfig.toggleShowMenu();
    }
  },
  mounted() {
    this.actionConfig.onMount()();
  },
  watch: {
    actionConfig: {
      deep: true,
      handler(newVal, oldVal) {
        console.log(`action config changed`, newVal, oldVal); /* //!DELETE */
      }
    }
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

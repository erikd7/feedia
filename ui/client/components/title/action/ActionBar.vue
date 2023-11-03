<template>
  <div class="ml-2" v-click-away="hideMenu" @mouseleave="hideMenu">
    <Kebab @click="toggleShowMenu" />
    <TieredMenu v-if="showMenu" :model="menuItems" />
  </div>
</template>

<script>
import TieredMenu from "primevue/tieredmenu";
import Kebab from "../../shared/menu/Kebab.vue";
import ProgressSpinner from "primevue/progressspinner";
import { getUserLists } from "../../../http-clients/list";

export default {
  props: {
    title: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showMenu: false,
      userLists: []
    };
  },
  components: { TieredMenu, Kebab, ProgressSpinner },
  computed: {
    userListMenus() {
      return this.userLists.map(l => ({
        ...l,
        label: l.name,
        command: () => {
          this.addToList(l.id, l.name);
        }
      }));
    },
    menuItems() {
      return [
        {
          label: "Add to List",
          icon: "pi pi-fw pi-file",
          items: this.userListMenus
        }
      ];
    }
  },
  mounted() {
    this.getUserLists();
  },
  methods: {
    toggleShowMenu() {
      this.showMenu = !this.showMenu;
    },
    hideMenu() {
      this.showMenu = false;
    },
    async getUserLists() {
      if (!this.userLists?.length) {
        const result = await getUserLists();
        if (result?.length) {
          this.userLists = Array.from(result);
        }
      }
    },
    async addToList(listId, listName) {
      this.hideMenu();
      try {
        await this.title.addToList(listId);
        this.$toast.add({
          severity: "success",
          summary: `Added ${this.title.title} to ${listName}`,
          life: 3000,
          group: "bl"
        });
      } catch (error) {
        if (error.message?.includes("409")) {
          this.$toast.add({
            severity: "warn",
            summary: `${this.title.displayTitle()} has already been added to ${listName}`,
            life: 3000,
            group: "bl"
          });
        } else {
          this.$toast.add({
            severity: "error",
            summary: `Unable to add ${this.title.title} to ${listName}`,
            life: 3000,
            group: "bl"
          });
        }
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

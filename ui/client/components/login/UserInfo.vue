<template>
  <div class="pl-2 position-relative">
    <span v-if="userLoginInfo">
      <UserAvatar
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        :photoUrl="userLoginInfo.photoUrl"
        class="cursor-pointer"
      />
      <div v-if="showMenu" class="card position-absolute right-0">
        <Menu ref="menu" :model="menuItems" :popup="true" />
      </div>
    </span>
  </div>
</template>

<script>
import { getLoginInfo, signOut } from "../../util/auth/actions";
import UserAvatar from "./UserAvatar";
import Menu from "primevue/menu";

export default {
  components: { UserAvatar, Menu },
  data() {
    return {
      showMenu: true,
      menuItems: [
        {
          label: "Sign out",
          icon: "pi pi-fw pi-trash",
          command: this.initiateSignout
        }
      ]
    };
  },
  computed: {
    userLoginInfo() {
      return this.getLoginInfo();
    },
    name() {
      return this.parsedToken?.nameFirst || this.parsedToken?.nameLast;
    },
    photoUrl() {
      return this.parsedToken?.photoUrl;
    }
  },
  methods: {
    getLoginInfo,
    signOut,
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    initiateSignout() {
      console.log(`signing out`); /* //!DELETE */
      this.signOut(this.$router);
    }
  }
};
</script>

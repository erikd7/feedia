<template>
  <div class="pl-2 position-relative">
    <span v-if="user">
      <UserAvatar
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        :photoUrl="user.photoUrl"
        class="cursor-pointer"
      />
      <div v-if="showMenu" class="card position-absolute right-0">
        <Menu ref="menu" :model="menuItems" :popup="true" />
      </div>
    </span>
  </div>
</template>

<script>
import { signOut } from "../../util/auth/actions";
import UserAvatar from "./UserAvatar";
import Menu from "primevue/menu";
import { mapGetters } from "vuex";

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
    ...mapGetters("user", ["user"]),
    name() {
      return this.user?.nameFirst + " " + this.user?.nameLast;
    },
    photoUrl() {
      return this.user?.photoUrl;
    }
  },
  methods: {
    signOut,
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    initiateSignout() {
      this.signOut(this.$router);
    }
  }
};
</script>

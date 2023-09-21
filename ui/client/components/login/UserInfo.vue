<template>
  <div class="pl-2">
    <div v-if="parsedToken">
      <UserAvatar :photoUrl="parsedToken.photoUrl" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserAvatar from "./UserAvatar";

export default {
  components: { UserAvatar },
  computed: {
    ...mapGetters("user", ["parsedToken"]),
    name() {
      return this.parsedToken.nameFirst || this.parsedToken.nameLast;
    },
    photoUrl() {
      return this.parsedToken.photoUrl;
    }
  }
};
</script>

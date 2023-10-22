<template>
  <div class="m-3">
    <Divider align="left" type="dotted">
      <b>Lists</b>
    </Divider>
    <UserLists userId />
  </div>
</template>

<script>
import Divider from "primevue/divider";
import UserLists from "../shared/list/UserLists";
import { mapGetters } from "vuex";

export default {
  components: { Divider, UserLists },
  computed: {
    ...mapGetters("user", ["user"]),
    userId() {
      return user?.id;
    }
  }
};
</script>

<template>
  <Lists
    :lists="userLists"
    :showCreate="true"
    @formComplete="() => getUserLists(false)"
  />
</template>

<script>
import Lists from "./Lists";
import { getUserLists } from "../../../http-clients/list";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { Lists },
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters("list", ["userLists"])
  },
  methods: {
    ...mapActions("list", ["setUserLists"]),
    async getUserLists(useCache) {
      const result = await getUserLists(useCache);
    }
  },
  mounted() {
    this.getUserLists();
  }
};
</script>

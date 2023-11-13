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
  data() {
    return {
      //lists: []
    };
  },
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
      console.log(`got user lists`, result); /* //!DELETE */
      //await this.setUserLists(result);
    }
  },
  mounted() {
    this.getUserLists();
  }
};
</script>

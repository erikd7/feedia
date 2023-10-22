<template>
  <Lists :lists="lists" />
</template>

<script>
import Lists from "./Lists";
import { getUserLists } from "../../../http-clients/list";

export default {
  data() {
    return {
      lists: []
    };
  },
  components: { Lists },
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  methods: {
    async getUserLists() {
      this.lists = await getUserLists();
    }
  },
  mounted() {
    this.getUserLists();
  }
};
</script>

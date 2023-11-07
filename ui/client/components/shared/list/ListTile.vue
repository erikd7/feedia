<template>
  <Card class="w-40 h-20" @click="openList" :title="name">
    <template #title>
      <p class="text-base break-all">{{ name }}</p>
    </template>
    <template #content></template>
  </Card>
</template>

<script>
import Card from "primevue/card";
import { ROUTES } from "../../../util/constants/navigation";

export default {
  components: { Card },
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    openList() {
      this.$router.push(ROUTES.LIST + "/" + this.id);
    }
  }
};
</script>

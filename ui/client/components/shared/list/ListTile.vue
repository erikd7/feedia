<template>
  <Card class="w-48 h-20 p-1" @click="openList" :title="name">
    <template #title>
      <p class="text-base break-word">{{ truncatedName }}</p>
    </template>
    <template #content></template>
  </Card>
</template>

<script>
import Card from "primevue/card";
import { ROUTES } from "../../../util/constants/navigation";
import { truncate } from "../../../util/format/text";

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
  computed: {
    truncatedName() {
      return truncate(this.name, 60);
    }
  },
  methods: {
    openList() {
      this.$router.push(ROUTES.LIST + "/" + this.id);
    }
  }
};
</script>
<style scoped>
:deep(.p-card-body) {
  padding: 0px !important;
}
</style>

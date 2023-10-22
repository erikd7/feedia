<template>
  <ScrollPanel>
    <div class="flex flex-row">
      <div v-for="list in lists" class="m-2 cursor-pointer hover-grow">
        <ListTile :id="list.id" :name="list.name" />
      </div>
    </div>
  </ScrollPanel>
</template>

<script>
import ScrollPanel from "primevue/scrollpanel";
import ListTile from "./ListTile";

export default {
  components: { ScrollPanel, ListTile },
  props: {
    lists: {
      type: Array,
      default: () => []
    }
  }
};
</script>

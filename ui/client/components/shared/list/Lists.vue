<template>
  <div>
    <Dialog
      modal
      v-model:visible="modalVisible"
      header="Create List"
      :style="{ width: '70vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <ListForm @complete="onFormComplete" class="mt-4" />
    </Dialog>
    <ScrollPanel>
      <div class="flex flex-row">
        <div v-if="showCreate" class="mr-2">
          <Button
            label="Create"
            rounded
            @click="showCreateModal"
            class="vertical-center"
          />
        </div>
        <div v-for="list in lists" class="mr-2 cursor-pointer hover-grow">
          <ListTile :id="list.id" :name="list.name" />
        </div>
      </div>
    </ScrollPanel>
  </div>
</template>

<script>
import ScrollPanel from "primevue/scrollpanel";
import ListTile from "./ListTile";
import ListForm from "./Form";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

export default {
  emits: ["formComplete"],
  data() {
    return {
      modalVisible: false
    };
  },
  components: { Dialog, ScrollPanel, ListTile, Button, ListForm },
  props: {
    lists: {
      type: Array,
      default: () => []
    },
    showCreate: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showCreateModal() {
      this.modalVisible = true;
    },
    onFormComplete() {
      this.closeCreateModal();
      this.$emit("formComplete");
    },
    closeCreateModal() {
      this.modalVisible = false;
    }
  }
};
</script>

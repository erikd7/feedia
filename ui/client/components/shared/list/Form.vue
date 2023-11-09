<template>
  <div class="flex flex-col child:m-1">
    <div class="flex flex-column gap-1">
      <span class="p-float-label">
        <InputText
          id="name"
          type="text"
          v-model="name"
          @blur="nameVisited = true"
          autofocus
          :class="{
            'p-invalid': nameVisited && !nameValid
          }"
          :pt="{
            root: { autocomplete: 'off', class: 'w-5/6 max-w-sm' }
          }"
        />
        <label for="name">Name</label>
      </span>
      <small
        id="name-help"
        v-show="nameVisited && !nameValid"
        :style="{ height: '2em' }"
      >
        Enter a name for the list under {{ nameMaxLength }} characters
      </small>
    </div>
    <div class="flex flex-row justify-end">
      <span v-tooltip.top="{ value: tooltip, showDelay: 500, hideDelay: 300 }">
        <Button
          label="Save"
          rounded
          @click="save"
          class="justify-end"
          :disabled="!allowSave"
        />
      </span>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { createList, updateList } from "../../../http-clients/list";
import { LIST_NAME_MAX_LENGTH } from "../../../util/constants/list";

export default {
  emits: ["complete"],
  data() {
    return {
      name: this.list.name,
      nameVisited: false
    };
  },
  components: { Button, InputText },
  props: {
    list: {
      type: Object,
      default: {}
    }
  },
  computed: {
    nameMaxLength() {
      return LIST_NAME_MAX_LENGTH;
    },
    nameValid() {
      return this.name?.length && this.name.length <= this.nameMaxLength;
    },
    valid() {
      return this.nameValid;
    },
    hasChanged() {
      return this.name !== this.list.name;
    },
    allowSave() {
      //If edit and hasn't changed, don't allow save
      if (this.isExisting && !this.hasChanged) {
        return false;
      }

      return this.valid;
    },
    tooltip() {
      if (this.allowSave) {
        return "Save the list";
      }
      if (this.isExisting && !this.hasChanged) {
        return "No changes have been made";
      }
      return "Correct the invalid fields";
    },
    isExisting() {
      return Boolean(this.list.id);
    }
  },
  methods: {
    async save() {
      //Create OR update
      if (this.isExisting) {
        await this.update();
      } else {
        await this.create();
      }

      //Emit complete event for parent to handle
      this.complete();
    },
    async create() {
      try {
        await createList(this.name);
        this.$toast.add({
          severity: "success",
          summary: `Created list ${this.name}`,
          life: 3000,
          group: "bl"
        });
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: `Unable to create list ${this.name}`,
          life: 3000,
          group: "bl"
        });
      }
    },
    async update() {
      try {
        await updateList(this.list.id, this.name);
        this.$toast.add({
          severity: "success",
          summary: `Updated list ${this.name}`,
          life: 3000,
          group: "bl"
        });
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: `Unable to update list ${this.name}`,
          life: 3000,
          group: "bl"
        });
      }
    },
    complete() {
      this.$emit("complete");
    }
  }
};
</script>

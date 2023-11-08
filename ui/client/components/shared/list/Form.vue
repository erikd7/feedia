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
          :disabled="!valid"
        />
      </span>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { createList } from "../../../http-clients/list";
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
      type: String,
      default: ""
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
    tooltip() {
      if (this.valid) {
        return "Save the list";
      }
      return "Correct the invalid fields";
    }
  },
  methods: {
    async save() {
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

      //Emit complete event for parent to handle
      this.complete();
    },
    complete() {
      this.$emit("complete");
    }
  }
};
</script>

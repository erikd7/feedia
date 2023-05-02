<template>
  <div class="card flex justify-content-center">
    <AutoComplete
      v-model="selection"
      class="w-100 hide-default-results"
      inputClass="w-100"
      placeholder="Search"
      :suggestions="items"
      :optionLabel="optionLabel"
      :minLength="3"
      :delay="400"
      @complete="onQuery"
    >
      <template #option="slotProps">
        <slot name="option" :option="slotProps"></slot>
      </template>
    </AutoComplete>
  </div>
</template>

<script>
import AutoComplete from "primevue/autocomplete";

export default {
  components: { AutoComplete },
  props: {
    liveSearch: {
      type: Function,
      default: () => {}
    },
    updateItems: {
      type: Function,
      default: currentItems => currentItems
    },
    optionLabel: {
      type: Function,
      default: () => "label"
    }
  },
  data() {
    return {
      selection: null,
      items: []
    };
  },
  methods: {
    async onQuery(event) {
      try {
        //Call the search
        const result = await this.liveSearch(event.query);

        //Update the items
        this.items = this.updateItems(this.items, result);
      } catch (e) {
        //update universal error handler here
        console.log(
          `Error searching with query '${event.query}': ${e.message}'`
        );
      }
    }
  }
};
</script>

<style scoped>
:deep(.p-autocomplete),
:deep(.p-autocomplete-input) {
  width: 100%;
}

:deep(.p-autocomplete .p-hidden-accessible),
:deep(.p-autocomplete-panel .p-hidden-accessible) {
  display: none;
}
</style>

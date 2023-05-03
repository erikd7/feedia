<template>
  <div class="card flex justify-content-center">
    <AutoComplete
      v-model="query"
      class="w-100 hide-default-results"
      :inputProps="{ ref: 'focusInput' }"
      inputClass="w-100"
      placeholder="Search"
      :suggestions="results"
      :optionLabel="optionLabel"
      :minLength="3"
      :delay="400"
      :completeOnFocus="true"
      :autoOptionFocus="false"
      @keydown.enter="onEnter"
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
import { mapState } from "vuex";
import { ROUTES } from "../../../util/constants/navigation";

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
      query: null
    };
  },
  computed: {
    ...mapState("search", ["results", "selection"])
  },
  methods: {
    async onQuery(event) {
      if (event.query) {
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
    },
    unfocus() {
      this.$refs.focusInput?.blur();
    },
    onEnter() {
      this.$router.push(ROUTES.SEARCH);
      this.unfocus();
    }
  }
};
</script>

<style scoped>
:deep(.p-autocomplete),
:deep(.p-autocomplete-input) {
  width: 100%;
}

:deep(.p-autocomplete .p-hidden-accessible) {
  display: none;
}
</style>

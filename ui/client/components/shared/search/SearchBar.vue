<template>
  <div class="card flex justify-content-center">
    <AutoComplete
      v-model="query"
      class="w-100 hide-default-results"
      :inputProps="{ ref: 'focusInput' }"
      inputClass="w-100"
      placeholder="Search"
      :suggestions="items"
      :optionLabel="optionLabel"
      :minLength="3"
      :delay="400"
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
import { ROUTES } from "../../../util/constants/navigation";

export default {
  components: { AutoComplete },
  props: {
    liveSearch: {
      type: Function,
      default: () => {}
    },
    items: {
      type: Array,
      default: () => []
    },
    updateItems: {
      type: Function,
      default: currentItems => currentItems
    },
    optionLabel: {
      type: Function,
      default: item => item.getLabel()
    }
  },
  data() {
    return {
      query: null
    };
  },
  methods: {
    onQuery(event) {
      if (event.query) {
        //Call the search
        this.liveSearch(event.query);
        this.query = event.query;
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

<template>
  <div class="card flex justify-content-center">
    <AutoComplete
      v-model="query"
      class="w-full search-bar-min-width hide-default-results"
      ref="autocomplete"
      :inputId="inputId"
      :inputProps="{ ref: 'focusInput' }"
      inputClass="w-full"
      :panelClass="{ hidden: hideResultsPanel }"
      :placeholder="placeholder"
      :suggestions="items"
      :optionLabel="optionLabel"
      :minLength="3"
      :delay="400"
      :autoOptionFocus="false"
      @focus="$event.target.select()"
      @keydown.enter="onEnter"
      @complete="onQuery"
      @click="
        event => {
          event.preventDefault();
          event.stopPropagation();
        }
      "
    >
      <template #option="slotProps">
        <slot name="option" :option="slotProps" />
      </template>
    </AutoComplete>
  </div>
</template>

<script>
import AutoComplete from "primevue/autocomplete";
import { ROUTES } from "../../../util/constants/navigation";
import { mapActions } from "vuex";

export default {
  components: { AutoComplete },
  props: {
    inputId: {
      type: String,
      default: "search-bar"
    },
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
    },
    hideResultsPanel: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "Search..."
    }
  },
  data() {
    return {
      query: null
    };
  },
  methods: {
    ...mapActions("navigation", ["toggleOffExpanded"]),
    onQuery(event) {
      if (event.query) {
        //Call the search
        this.liveSearch(event.query);
        this.query = event.query;
      }
    },
    onEnter(event) {
      event.target.blur();
      if (
        ![ROUTES.SEARCH, ROUTES.FIND].includes(
          this.$router.currentRoute._value.path
        )
      ) {
        this.$router.push(ROUTES.SEARCH);
      }
      this.toggleOffExpanded();
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
.search-bar-min-width {
  min-width: 300px;
}
</style>

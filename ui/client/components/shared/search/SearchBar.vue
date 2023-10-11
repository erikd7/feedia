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
  computed: {
    queryParam() {
      return this.$router.currentRoute?._value?.query?.query;
    },
    isInFindRoute() {
      return [ROUTES.SEARCH, ROUTES.FIND].includes(
        this.$router.currentRoute._value.path
      );
    }
  },
  methods: {
    setQueryParam(query) {
      this.$router.push({ query: { query } });
    },
    loadQueryFromParam() {
      if (this.queryParam) {
        this.query = this.queryParam;
      }
    },
    onQuery(event) {
      const { query } = event;
      if (query) {
        //Call the search
        this.liveSearch(query);

        //Update state info
        this.query = query;
        this.setQueryParam(query);
      }
    },
    onEnter(event) {
      event.target.blur();
      if (!this.isInFindRoute) {
        this.$router.push(ROUTES.SEARCH);
      }
    }
  },
  mounted() {
    //When mounting, load the search query from the URL query param (wait for router.isReady())
    this.$router.isReady().then(() => {
      this.loadQueryFromParam();
      //If in a route where results can be displayed, trigger a search
      if (this.isInFindRoute) {
        this.onQuery({ query: this.query });
      }
    });
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

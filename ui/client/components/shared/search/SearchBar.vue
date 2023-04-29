<template>
  <div>
    <AutoComplete
      v-model="selection"
      class="hide-default-results"
      placeholder="Search"
      :suggestions="items"
      :optionLabel="optionLabel"
      emptySearchMessage=" "
      :minLength="4"
      :delay="400"
      @complete="onQuery"
    >
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hide-default-results > span {
  display: none !important;
}
</style>

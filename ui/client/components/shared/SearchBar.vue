<template>
  <div>
    <AutoComplete
      v-model="selectedCountry"
      placeholder="Search"
      optionLabel="name"
      :suggestions="filteredCountries"
      emptySearchMessage="temp"
      minLength="4"
      delay="400"
      suggestions="Jonathan Strange & Mr. Norrell"
      @complete="search"
    >
      <template #option="slotProps">
        <div class="flex align-options-center">
          <img
            :alt="slotProps.option.name"
            src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
            :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`"
            style="width: 18px"
          />
          <div>{{ slotProps.option.name }}</div>
        </div>
      </template>
    </AutoComplete>
  </div>
</template>

<script>
import { searchBooks } from "../../http-clients/google";
import AutoComplete from "primevue/autocomplete";

export default {
  components: { AutoComplete },
  props: {},
  data() {
    return {
      myData: "nothing"
    };
  },
  methods: {
    search() {
      try {
        searchBooks("jonathan+strange+mr+norrell");
      } catch (e) {}
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

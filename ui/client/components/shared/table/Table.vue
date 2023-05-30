<template>
  <div>
    <DataView :value="rows">
      <template #list="{ data, index }">
        <div class="w-full rounded-lg hover:bg-slate-200">
          <slot name="row" :index="index" :row="data" />
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
import DataView from "primevue/dataview";

export default {
  components: { DataView },
  props: {
    rows: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<template>
  <div>
    <DataView :value="rows">
      <template #list="{ data, index }">
        <div class="w-full rounded-lg bg-slate-400 hover:bg-slate-400">
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

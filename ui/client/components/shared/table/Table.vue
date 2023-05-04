<template>
  <div>
    <DataView :value="rows">
      <template #list="row">
        <Row :key="row.key" :index="row.index" :data="row.data" />
      </template>
    </DataView>
  </div>
</template>

<script>
import DataView from "primevue/dataview";
import Row from "./Row";

export default {
  components: { DataView, Row },
  props: {
    rows: {
      type: Array,
      default: () => []
    }
  }
};
</script>

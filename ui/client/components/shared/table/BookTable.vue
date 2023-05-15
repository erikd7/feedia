<template>
  <div>
    <Table :rows="books">
      <template v-slot:row="row">
        <BookRow :book="row.row" :index="row.index" />
      </template>
    </Table>
  </div>
</template>

<script>
import Table from "./Table";
import BookRow from "./BookRow";

export default {
  components: { Table, BookRow },
  props: {
    books: {
      type: Array,
      default: () => []
    }
  }
};
</script>

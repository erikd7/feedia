<template>
  <Table :rows="results">
    <template v-slot:row="row">
      <MediaTypeSwitcher
        :mediaType="row.row.mediaType"
        :componentsByMediaType="componentsByMediaType"
        :passedProps="{
          [row.row.mediaType.toLowerCase()]: row.row,
          index: row.index
        }"
      />
    </template>
  </Table>
</template>

<script>
import Table from "./Table";
import MediaTypeSwitcher from "../media-type/MediaTypeSwitcher.vue";
import BookRow from "./BookRow";
import MovieRow from "./MovieRow";
import { MEDIA_TYPES } from "../../../util/constants/base";

export default {
  components: { Table, MediaTypeSwitcher },
  props: {
    results: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    componentsByMediaType() {
      return { [MEDIA_TYPES.BOOK]: BookRow, [MEDIA_TYPES.MOVIE]: MovieRow };
    }
  }
};
</script>

<template>
  <Table :rows="results">
    <template v-slot:row="row">
      <MediaTypeSwitcher
        :mediaType="row.row.mediaType"
        :componentsByMediaType="componentsByMediaType"
        :passedProps="{
          rowProps: { onClickRow: () => openDetails(row.row) },
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
import Row from "./Row.vue";
import BookRow from "../../book/BookRow.vue";
import MovieRow from "../../movie/MovieRow.vue";
import { MEDIA_TYPES } from "../../../util/constants/base";
import { mapActions } from "vuex";

export default {
  components: { Table, MediaTypeSwitcher, Row },
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
  },
  methods: {
    ...mapActions("details", ["setSelected"]),

    openDetails(details) {
      this.setSelected(details);

      //Load details by external ID, if necessary
      details.loadTitleByExternalId();

      //Load internal details
      details.getRatingInfo();

      this.$router.push({
        name: "Details",
        params: {
          mediaType: details.mediaType.toLowerCase(),
          id: details.routeId()
        }
      });
    }
  }
};
</script>
<style scoped>
:deep(.p-dataview-content) {
  color: unset !important;
}
</style>

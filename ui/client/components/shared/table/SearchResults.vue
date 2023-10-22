<template>
  <Table :rows="results">
    <template v-slot:row="row">
      <MediaTypeSwitcher :mediaType="row.row.mediaType">
        <template v-slot:[MEDIA_TYPES.BOOK]>
          <BookRow
            :index="row.index"
            :[row.row.mediaType.toLowerCase()]="row.row"
            :onClickRow="() => openDetails(row.row)"
          />
        </template>
        <template v-slot:[MEDIA_TYPES.MOVIE]>
          <MovieRow
            :index="row.index"
            :[row.row.mediaType.toLowerCase()]="row.row"
            :onClickRow="() => openDetails(row.row)"
          />
        </template>
      </MediaTypeSwitcher>
    </template>
  </Table>
</template>

<script>
import Table from "./Table";
import MediaTypeSwitcher from "../media-type/MediaTypeSwitcher2";
import Row from "./Row.vue";
import BookRow from "../../book/BookRow.vue";
import MovieRow from "../../movie/MovieRow.vue";
import { MEDIA_TYPES } from "../../../util/constants/base";
import { mapActions } from "vuex";

export default {
  components: { Table, MediaTypeSwitcher, Row, BookRow, MovieRow },
  props: {
    results: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    MEDIA_TYPES() {
      return MEDIA_TYPES;
    }
  },
  methods: {
    ...mapActions("details", ["setSelected"]),

    openDetails(details) {
      this.setSelected(details);

      //Load details by external ID, if necessary
      details.loadDetails();

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

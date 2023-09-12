<template>
  <Table :rows="results">
    <template v-slot:row="row">
      <div
        class="rounded overflow-hidden shadow-lg px-2 py-2 cursor-pointer text-main"
        @click="() => openDetails(row.row)"
      >
        <MediaTypeSwitcher
          :mediaType="row.row.mediaType"
          :componentsByMediaType="componentsByMediaType"
          :passedProps="{
            [row.row.mediaType.toLowerCase()]: row.row,
            index: row.index
          }"
        />
      </div>
    </template>
  </Table>
</template>

<script>
import Table from "./Table";
import MediaTypeSwitcher from "../media-type/MediaTypeSwitcher.vue";
import BookRow from "./BookRow";
import MovieRow from "./MovieRow";
import { MEDIA_TYPES } from "../../../util/constants/base";
import { mapActions } from "vuex";

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
  },
  methods: {
    ...mapActions("details", ["setSelected"]),

    openDetails(details) {
      this.setSelected(details);

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

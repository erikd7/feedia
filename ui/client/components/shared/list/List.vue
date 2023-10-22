<template>
  <div>
    <Loading v-if="loading" />
    <div v-else class="m-3">
      <DataView :value="titles" :layout="layout">
        <template #header>
          <h2
            class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight capitalize"
          >
            {{ name }}
          </h2>
          <div class="flex justify-content-end">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </template>

        <template #list="{ data }">
          <div class="col-12 p-2">
            <MediaTypeSwitcher :mediaType="data.mediaType">
              <template v-slot:[MEDIA_TYPES.BOOK]>
                <BookTile :wrapper="TileList" :book="data" />
              </template>
              <template v-slot:[MEDIA_TYPES.MOVIE]>
                <MovieTile :wrapper="TileList" :movie="data" />
              </template>
            </MediaTypeSwitcher>
          </div>
        </template>

        <template #grid="{ data }">
          <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
            <MediaTypeSwitcher :mediaType="data.mediaType">
              <template v-slot:[MEDIA_TYPES.BOOK]>
                <BookTile :wrapper="TileGrid" :book="data" />
              </template>
              <template v-slot:[MEDIA_TYPES.MOVIE]>
                <MovieTile :wrapper="TileGrid" :movie="data" />
              </template>
            </MediaTypeSwitcher>
          </div>
        </template>
      </DataView>
    </div>
  </div>
</template>

<script>
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import MediaTypeSwitcher from "../media-type/MediaTypeSwitcher2";
import Loading from "../Loading";
import TileGrid from "../../title/tile/TileGrid.vue";
import TileList from "../../title/tile/TileList.vue";
import BookTile from "../../book/Tile";
import MovieTile from "../../movie/Tile";
import { MEDIA_TYPES } from "../../../util/constants/base";
import { getList } from "../../../http-clients/list";
import { create } from "../../../classes/title-helper";

export default {
  data() {
    return {
      loading: false,
      name: null,
      owningUserId: null,
      titles: [],
      layout: "list"
    };
  },
  components: {
    Loading,
    TileGrid,
    TileList,
    DataView,
    DataViewLayoutOptions,
    MediaTypeSwitcher,
    BookTile,
    MovieTile
  },
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  computed: {
    MEDIA_TYPES() {
      return MEDIA_TYPES;
    },
    TileList() {
      return TileList;
    },
    TileGrid() {
      return TileGrid;
    }
  },
  methods: {
    async getDetails() {
      try {
        this.loading = true;
        const result = await getList(this.id);
        this.name = result.name;
        this.owningUserId = result.userId;
        this.titles = result.titles.map(t => create(t.mediaType, t));
      } catch (e) {
        console.error(e.message);
        throw e;
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.getDetails();
  }
};
</script>

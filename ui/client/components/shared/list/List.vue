<template>
  <div>
    <Dialog
      modal
      v-model:visible="editModalVisible"
      header="Edit List"
      :style="{ width: '70vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <ListForm @complete="onFormComplete" class="mt-4" :list="list" />
    </Dialog>
    <Loading v-if="loading" />
    <div v-else class="m-3">
      <DataView :value="titles" :layout="layout">
        <template #header>
          <h2
            class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight capitalize"
          >
            {{ name }}
            <font-awesome-icon
              class="text-gray-600 m-1 cursor-pointer hover-grow"
              icon="pencil"
              title="Edit list information"
              @click="showEditModal"
            />
            <font-awesome-icon
              class="text-red-300 m-1 cursor-pointer hover-grow"
              icon="trash"
              title="Delete list"
              @click="deleteWithConfirmation"
            />
          </h2>
          <div class="flex justify-content-end">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </template>

        <template #list="{ data }">
          <div class="col-12 p-2">
            <MediaTypeSwitcher :mediaType="data.mediaType">
              <template v-slot:[MEDIA_TYPES.BOOK]>
                <BookTile
                  :wrapper="TileList"
                  :book="data"
                  @click="() => openTitleDetails(data)"
                  class="cursor-pointer"
                />
              </template>
              <template v-slot:[MEDIA_TYPES.MOVIE]>
                <MovieTile
                  :wrapper="TileList"
                  :movie="data"
                  @click="() => openTitleDetails(data)"
                  class="cursor-pointer"
                />
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
import Dialog from "primevue/dialog";
import ListForm from "./Form";
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import MediaTypeSwitcher from "../media-type/MediaTypeSwitcher2";
import Loading from "../Loading";
import TileGrid from "../../title/tile/TileGrid.vue";
import TileList from "../../title/tile/TileList.vue";
import BookTile from "../../book/Tile";
import MovieTile from "../../movie/Tile";
import { mapActions } from "vuex";
import { MEDIA_TYPES } from "../../../util/constants/base";
import { getList, deleteList } from "../../../http-clients/list";
import { create } from "../../../classes/title-helper";
import { truncate } from "../../../util/format/text";
import { ROUTES } from "../../../util/constants/navigation";

export default {
  data() {
    return {
      editModalVisible: false,
      loading: false,
      layout: "list",
      list: {}
    };
  },
  components: {
    Dialog,
    ListForm,
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
    },
    name() {
      return this.list.name;
    },
    titles() {
      return this.list.titles;
    }
  },
  methods: {
    ...mapActions("details", ["setSelected"]),
    async getDetails() {
      try {
        this.loading = true;
        const result = await getList(this.id);
        this.list = {
          id: result.id,
          name: result.name,
          owningUserId: result.userId,
          titles: result.titles.map(t => create(t.mediaType, t))
        };
      } catch (e) {
        console.error(e.message);
        if (e.message?.includes("404")) {
          this.redirectToLibrary();
        }
        throw Error("Unable to get list information");
      } finally {
        this.loading = false;
      }
    },
    showEditModal() {
      this.editModalVisible = true;
    },
    closeEditModal() {
      this.editModalVisible = false;
    },
    onFormComplete() {
      this.getDetails();
      this.closeEditModal();
    },
    openTitleDetails(title) {
      this.setSelected(title);

      this.$router.push({
        name: "Details",
        params: {
          mediaType: title.mediaType.toLowerCase(),
          id: title.routeId()
        }
      });
    },
    deleteWithConfirmation() {
      this.$confirm.require({
        message: "Are you sure you want to delete the list?",
        header: `Delete ${truncate(this.name, 30)}`,
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.deleteList();
        }
      });
    },
    async deleteList() {
      try {
        await deleteList(this.list.id);
        this.$toast.add({
          severity: "success",
          summary: `Deleted ${this.name}`,
          life: 3000,
          group: "bl"
        });
        this.redirectToLibrary();
      } catch (e) {
        console.log(e);
        this.$toast.add({
          severity: "error",
          summary: `Unable to delete the list`,
          life: 3000,
          group: "bl"
        });
        throw Error(`Failed to delete list`);
      }
    },
    redirectToLibrary() {
      this.$router.push(ROUTES.LIBRARY);
    }
  },
  mounted() {
    this.getDetails();
  }
};
</script>

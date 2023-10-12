<template>
  <MediaTypeSwitcher
    v-if="mediaType && selected?.isValidTitle"
    class="text-main"
    :mediaType="mediaType"
    :componentsByMediaType="componentsByMediaType"
    :passedProps="{
      id,
      [mediaType.toLowerCase()]: selected,
      detailProps: { onClickImage: () => {} }
    }"
  />
</template>

<script>
import Loading from "../shared/Loading";
import MediaTypeSwitcher from "../shared/media-type/MediaTypeSwitcher.vue";
import BookDetails from "../book/BookDetails";
import MovieDetails from "../movie/MovieDetails";
import { MEDIA_TYPES } from "../../util/constants/base";
import { mapGetters, mapActions } from "vuex";
import { createAndLoadDetailsById } from "../../classes/title-helper";

export default {
  components: { Loading, MediaTypeSwitcher },
  props: {
    mediaType: {
      type: String,
      required: true
    },
    id: {
      type: String
    }
  },
  computed: {
    ...mapGetters("details", ["selected"]),
    componentsByMediaType() {
      return {
        [MEDIA_TYPES.BOOK]: BookDetails,
        [MEDIA_TYPES.MOVIE]: MovieDetails
      };
    },
    paramsId() {
      return this.$router.currentRoute._value.params.id;
    }
  },
  methods: {
    ...mapActions("details", ["setSelected"]),
    async loadDetailsById() {
      if (this.paramsId && !this.selected) {
        const title = createAndLoadDetailsById(this.mediaType, this.paramsId);

        await title.loadDetails();
        this.setSelected(title);
      }
    }
  },
  mounted() {
    //Retrieve details if they aren't already set
    this.$router.isReady().then(() => {
      this.loadDetailsById();
    });
  }
};
</script>

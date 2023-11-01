<template>
  <div>
    <Loading v-if="title.loading" message="Loading details..." />
    <div v-else class="flex flex-row">
      <div class="flex flex-column pr-2">
        <slot name="photo" />
      </div>
      <div class="flex flex-column justify-between">
        <div class="card-section">
          <div class="flex flex-row">
            <MediaTypeIcon :mediaType="title.mediaType" />
            <p class="font-bold text-xl">
              <slot name="title" />
            </p>
          </div>
          <slot name="subHeader" />
        </div>
        <slot name="rating">
          <RatingInfo
            :average="title.rating"
            :count="title.ratings"
            :user="title.userRating"
            :onSet="setRating"
          />
        </slot>
        <slot name="body" />
        <slot name="infoStrip" />
      </div>
    </div>
    <div class="py-3">
      <slot name="main" />
    </div>
  </div>
</template>

<script>
import RatingInfo from "../title/rating/RatingInfo";
import Loading from "../shared/Loading";
import MediaTypeIcon from "../navigation/MediaTypeIcon";

export default {
  components: { RatingInfo, Loading, MediaTypeIcon },
  props: {
    onClickImage: {
      type: Function,
      default: () => {}
    },
    title: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    setRating(rating) {
      this.title.setRating(rating);
    }
  }
};
</script>

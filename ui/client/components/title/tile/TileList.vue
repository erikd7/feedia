<template>
  <div>
    <div class="flex flex-row">
      <div class="flex flex-column pr-2">
        <slot name="photo" />
      </div>
      <div class="flex flex-column justify-between">
        <div class="card-section">
          <p class="font-bold text-xl">
            <slot name="title" />
          </p>
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
import RatingInfo from "../rating/RatingInfo";

export default {
  components: { RatingInfo },
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

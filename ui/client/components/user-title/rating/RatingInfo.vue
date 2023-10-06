<template>
  <div>
    <div>
      <DotSeparatedInfo
        :info="[
          average ? `${average}/${maxRating}` : 'No ratings',
          `${count.toLocaleString('en-US', {
            style: 'decimal'
          })} ratings`,
          currentUserRating
            ? `My Rating: ${currentUserRating}`
            : 'Not yet rated'
        ]"
      />
    </div>
    <Rating
      v-model="currentUserRating"
      @change="setRating"
      :stars="maxRating"
    />
  </div>
</template>

<script>
import { RATING_MAX } from "../../../util/constants/base";
import Rating from "primevue/rating";
import DotSeparatedInfo from "../../shared/info/DotSeparatedInfo.vue";

export default {
  props: {
    average: {
      type: Number
    },
    count: {
      type: Number,
      default: 0
    },
    user: {
      type: Number
    },
    onSet: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      currentUserRating: this.user
    };
  },
  watch: {
    //Keep local user rating in sync with user rating from class (for async updates)
    user() {
      this.currentUserRating = this.user;
    }
  },
  components: { Rating, DotSeparatedInfo },
  computed: {
    maxRating() {
      return RATING_MAX;
    }
  },
  methods: {
    setRating(event) {
      this.onSet(event.value);
    }
  }
};
</script>

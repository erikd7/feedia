<template>
  <div class="rounded overflow-hidden shadow-lg px-2 py-2">
    <div class="flex flex-row">
      <div class="flex flex-column">movie poster</div>
      <div class="flex flex-column justify-between">
        <div class="card-section">
          <p class="font-bold text-xl">
            {{ title }}
          </p>
          <DotSeparatedInfo
            :info="[
              director,
              year,
              {
                value: length,
                formatter: length => getHoursAndMinutesFromMinutes(length)
              }
            ]"
          />
        </div>
        <div
          v-if="description"
          :title="`Description of ${title}`"
          class="card-section"
        >
          <p class="text-gray-700 text-base italic text-ellipses">
            {{ truncate(description, 300) }}
          </p>
        </div>
        <div class="mobile-hide card-section space-x-1 space-y-1">
          <Chip
            v-for="subject in movie.subjects"
            :title="subject"
            :label="truncate(subject, 30)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chip from "primevue/chip";
import DotSeparatedInfo from "../info/DotSeparatedInfo.vue";
import { truncate } from "../../../util/format/text";
import { getHoursAndMinutesFromMinutes } from "../../../util/format/time";

export default {
  components: { Chip, DotSeparatedInfo },
  props: {
    index: {
      type: Number,
      required: true
    },
    movie: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    truncate,
    getHoursAndMinutesFromMinutes
  },
  computed: {
    title() {
      return this.movie.displayTitle();
    },
    director() {
      return "Edgar Wright";
    },
    year() {
      return this.movie.displayYear();
    },
    length() {
      return 125;
    },
    description() {
      return this.movie.displayDescription();
    }
  }
};
</script>
<style scoped>
.p-dataview-content > div > div {
  width: 100% !important;
}
.card-section {
  padding: 5px;
}
.card-section:first-child {
  padding-top: 0;
}

.card-section:last-child {
  padding-bottom: 0;
}
</style>

<template>
  <div class="flex flex-row px-2 py-2">
    <div class="flex flex-column">
      <BookCover :book="book">
        <template v-slot:coverAction="{ hovered }">
          <MediaTypeIcon v-if="hovered" :mediaType="mediaType"
        /></template>
      </BookCover>
    </div>
    <div class="flex flex-column justify-between">
      <div class="card-section">
        <p class="font-bold text-xl">
          {{ title }}
        </p>
        <DotSeparatedInfo
          :info="[
            first3Authors,
            firstPublishYear,
            { value: pageCount, formatter: pageCount => pageCount + ' pages' }
          ]"
        />
      </div>
      <div
        v-if="firstSentence"
        :title="`First sentence of ${title}`"
        class="card-section"
      >
        <p class="text-base italic text-ellipses">
          {{ truncate(firstSentence, 100) }}
        </p>
      </div>
      <div class="mobile-hide card-section space-x-1 space-y-1">
        <Chip
          v-for="subject in book.subjects"
          :title="subject"
          :label="truncate(subject, 30)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BookCover from "../image/BookCover";
import MediaTypeIcon from "../../navigation/MediaTypeIcon.vue";
import Chip from "primevue/chip";
import DotSeparatedInfo from "../info/DotSeparatedInfo.vue";
import { truncate } from "../../../util/format/text";
import { MEDIA_TYPES } from "../../../util/constants/base";

export default {
  components: { BookCover, MediaTypeIcon, Chip, DotSeparatedInfo },
  props: {
    index: {
      type: Number,
      required: true
    },
    book: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    truncate
  },
  computed: {
    mediaType() {
      return MEDIA_TYPES.BOOK;
    },
    title() {
      return this.book.displayTitle();
    },
    first3Authors() {
      return this.book.displayFirstNAuthors(3);
    },
    firstPublishYear() {
      return this.book.displayFirstPublishYear();
    },
    pageCount() {
      return this.book.displayPages();
    },
    firstSentence() {
      return this.book.displayFirstSentence();
    }
  }
};
</script>
<style scoped>
.p-dataview-content > div > div {
  width: 100% !important;
}
</style>

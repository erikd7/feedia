<template>
  <div class="rounded overflow-hidden shadow-lg px-2 py-2">
    <div class="flex flex-row">
      <div class="flex flex-column">
        <BookCover :book="book" />
      </div>
      <div class="flex flex-column justify-between">
        <div class="card-section">
          <p class="font-bold text-xl">
            {{ title }}
          </p>
          <div class="space-x-1">
            <a>
              {{ first3Authors }}
            </a>
            <a>&#x2022;</a>
            <a>{{ firstPublishYear }}</a>
            <a>&#x2022;</a>
            <a v-if="pageCount">{{ pageCount }} pageCount</a>
          </div>
        </div>
        <div v-if="firstSentence" class="card-section">
          <p class="text-gray-700 text-base italic text-ellipses">
            {{ truncate(firstSentence, 100) }}
          </p>
        </div>
        <div
          class="card-section space-x-1"
          :title="`First sentence of ${title}`"
        >
          <Chip v-for="subject in book.subjects" :label="subject" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookCover from "../image/BookCover";
import Chip from "primevue/chip";
import { truncate } from "../../../util/format/text";
import { book } from "../../../util/constants/fields";

export default {
  components: { BookCover, Chip },
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
    title() {
      return book.displayTitle();
    },
    first3Authors() {
      return book.displayFirstNAuthors(3);
    },
    firstPublishYear() {
      return book.displayFirstPublishYear();
    },
    pageCount() {
      return book.pageCount();
    },
    firstSentence() {
      return book.displayFirstSentence();
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

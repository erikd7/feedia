<template>
  <div class="rounded overflow-hidden shadow-lg px-2 py-2">
    <div class="flex flex-row">
      <div class="flex flex-column">
        <BookCover :book="book" />
      </div>
      <div class="flex flex-column justify-between">
        <div class="card-section">
          <p class="font-bold text-xl">
            {{ callClassFn(book, "displayTitle") }}
          </p>
          <div class="space-x-1">
            <a>
              {{ callClassFn(book, "displayFirstNAuthors", [3]) }}
            </a>
            <a>&#x2022;</a>
            <a>{{ callClassFn(book, "displayFirstPublishYear") }}</a>
            <a>&#x2022;</a>
            <a v-if="callClassFn(book, 'displayPages')"
              >{{ callClassFn(book, "displayPages") }} pages</a
            >
          </div>
        </div>
        <div
          v-if="callClassFn(book, 'displayDescription')"
          class="card-section"
        >
          <p class="text-gray-700 text-base italic text-ellipses">
            {{ truncate(callClassFn(book, "displayDescription"), 200) }}
          </p>
        </div>
        <div
          v-if="callClassFn(book, 'displayFirstSentence')"
          class="card-section"
        >
          <p class="text-gray-700 text-base italic text-ellipses">
            {{ truncate(callClassFn(book, "displayFirstSentence"), 100) }}
          </p>
        </div>
        <div
          class="card-section space-x-1"
          :title="`First sentence of ${callClassFn(book, 'displayTitle')}`"
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
import { callClassFn } from "../../../util/class";
import { truncate } from "../../../util/format/text";

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
    callClassFn,
    truncate
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

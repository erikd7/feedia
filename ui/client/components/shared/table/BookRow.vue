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
          <p class="">
            {{ callClassFn(book, "displayFirstNAuthors", [3]) }}
          </p>
        </div>
        <div class="card-section">
          <p class="text-gray-700 text-base card-section">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div class="card-section">
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >{{ callClassFn(book, "displayFirstPublishYear") }}</span
          >
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >#travel</span
          >
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >#winter</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookCover from "../image/BookCover";
import { callClassFn } from "../../../util/class";

export default {
  components: { BookCover },
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
    callClassFn
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

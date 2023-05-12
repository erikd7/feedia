<template>
  <div>
    <div class="col-12">
      <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
        <BookCover :book="book" />
        <div
          class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
        >
          <div
            class="flex flex-column align-items-center sm:align-items-start gap-3"
          >
            <div class="text-2xl font-bold text-900">
              {{ book.title }}
            </div>
            <div
              class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
            >
              {{ callClassFn(book, "displayFirstNAuthors", [3]) }} |
              {{ callClassFn(book, "displayFirstPublishYear") }}
            </div>
            Rating
            <div class="flex align-items-center gap-3">
              <span class="flex align-items-center gap-2">
                <i class="pi pi-tag"></i>
                <span class="font-semibold">{{ book.genres }}</span>
              </span>
            </div>
          </div>
          <div
            class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
          >
            {{ callClassFn(book, "displayFirstPublishYear") }}
          </div>
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
</style>

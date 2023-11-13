<template>
  <div>
    <component :is="wrapper" v-bind="{ title: book }">
      <template v-slot:photo>
        <BookCover :book="book">
          <template v-slot:coverAction="{ hovered }">
            <div v-show="hovered">
              <ActionBar :actionConfig="actionBarConfig" />
            </div>
          </template>
        </BookCover>
      </template>
      <template v-slot:title>
        {{ title }}
      </template>
      <template v-slot:subHeader>
        <DotSeparatedInfo
          :info="[
            first3Authors,
            firstPublishYear,
            { value: pageCount, formatter: pageCount => pageCount + ' pages' }
          ]"
        />
      </template>
      <template v-slot:main>
        <div
          v-if="firstSentence"
          :title="`First sentence of ${title}`"
          class="card-section"
        >
          <p class="text-base italic text-ellipses">
            {{ truncate(firstSentence, 100) }}
          </p>
        </div>
      </template>
      <template v-slot:infoStrip>
        <div class="mobile-hide card-section space-x-1 space-y-1">
          <Chip
            v-for="subject in book.subjects"
            :title="subject"
            :label="truncate(subject, 30)"
          />
        </div>
      </template>
    </component>
  </div>
</template>

<script>
import BookCover from "./BookCover";
import MediaTypeIcon from "../navigation/MediaTypeIcon.vue";
import Chip from "primevue/chip";
import DotSeparatedInfo from "../shared/info/DotSeparatedInfo.vue";
import { truncate } from "../../util/format/text";
import { MEDIA_TYPES } from "../../util/constants/base";
import ActionBar from "../title/action/ActionBar";
import { TitleActionBarConfig } from "../title/action/helper";

export default {
  components: {
    BookCover,
    ActionBar,
    MediaTypeIcon,
    Chip,
    DotSeparatedInfo
  },
  props: {
    wrapper: {
      type: Object,
      default: () => <slot />
    },
    book: {
      type: Object,
      required: true
    }
  },
  methods: {
    truncate
  },
  computed: {
    actionBarConfig() {
      return TitleActionBarConfig.build(
        this.book,
        { addToLists: true },
        this.$toast.add
      );
    },
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

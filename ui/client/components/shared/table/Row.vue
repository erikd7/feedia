<template>
  <div>
    <div class="col-12">
      <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
        Book Cover
        <div
          class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
        >
          <div
            class="flex flex-column align-items-center sm:align-items-start gap-3"
          >
            <div class="text-2xl font-bold text-900">
              {{ data.title }}
            </div>
            <div
              class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
            >
              {{ data.authors }} | {{ data.publishedYear }}
            </div>
            Rating
            <div class="flex align-items-center gap-3">
              <span class="flex align-items-center gap-2">
                <i class="pi pi-tag"></i>
                <span class="font-semibold">{{ data.genres }}</span>
              </span>
            </div>
          </div>
          <div
            class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
          >
            {{ data.publishedYear }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    key: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {}
};
</script>

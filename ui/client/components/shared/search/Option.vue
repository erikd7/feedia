<template>
  <div class="flex flex-row">
    <div class="vertical-center-flex pr-2">
      <slot name="prefix" />
    </div>
    <div class="text-left text-ellipsis flex-grow">
      <div class="font-semibold">
        <slot name="title" />
      </div>
      <div class="flex flex-row justify-between text-sm">
        <div>
          <slot name="subtitle-left" />
        </div>
        <div>
          <slot name="subtitle-right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

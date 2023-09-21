<template>
  <div>
    <Avatar
      :image="photoUrl"
      shape="circle"
      :pt="{
        image: {
          referrerPolicy: 'no-referrer',
          crossorigin: 'anonymous'
        }
      }"
    >
    </Avatar>
  </div>
</template>

<script>
import Avatar from "primevue/avatar";

export default {
  components: { Avatar },
  props: {
    photoUrl: {
      type: String
    }
  }
};
</script>

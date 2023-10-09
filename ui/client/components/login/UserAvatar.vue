<template>
  <div>
    <Avatar
      :image="photoUrl"
      shape="circle"
      :pt="{
        image: {
          class: 'hover:outline hover:outline-1',
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
import { getLocalUserInfo } from "../../util/auth/actions";

export default {
  components: { Avatar },
  props: {
    photoUrl: {
      type: String
    }
  },
  computed: {
    aggregatePhotoUrl() {
      return this.photoUrl || this.getLocalUserInfo();
    }
  },
  methods: { getLocalUserInfo }
};
</script>

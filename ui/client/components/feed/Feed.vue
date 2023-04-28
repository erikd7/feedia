<template
  ><button @click="doThing">This is the feed{{ myData }}</button></template
>

<script>
import { get } from "../../util/http";
export default {
  components: {},
  props: {},
  data() {
    return {
      myData: "nothing"
    };
  },
  methods: {
    doThing() {
      try {
        console.log(`doing the thing`); /* //!DELETE */
        get("http://localhost:3000/api")
          .then(res => {
            this.myData = "yay" + JSON.stringify(res);
          })
          .catch(e => {
            console.log(`caught error`, e); /* //!DELETE */
            this.myData = e.message;
          });
      } catch (e) {}
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

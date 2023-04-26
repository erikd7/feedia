import Vue from "vue";
import VueRouter from "vue-router";
import Feed from "../components/feed/Feed.vue";
import Library from "../components/library/Library.vue";

Vue.use(VueRouter);

export const routes = [
  {
    name: "Feed",
    path: "/",
    component: Feed
  },
  {
    name: "Library",
    path: "/library",
    component: Library
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.afterEach(to => {
  Vue.nextTick(() => {
    document.title = `Feedia | ${to.name}`;
  });
});

export default router;

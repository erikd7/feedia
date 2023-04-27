import { createRouter, createWebHistory } from "vue-router";
import Feed from "../components/feed/Feed.vue";
import Library from "../components/library/Library.vue";

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

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.afterEach(to => {
  document.title = `Feedia | ${to.name}`;
});

export default router;

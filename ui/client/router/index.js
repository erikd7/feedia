import { createRouter, createWebHistory } from "vue-router";
import Feed from "../components/feed/Feed.vue";
import Library from "../components/library/Library.vue";
import Find from "../components/find/Find.vue";

export const routes = [
  {
    name: "Feed",
    path: "/",
    alias: "/feed",
    component: Feed
  },
  {
    name: "Library",
    path: "/library",
    component: Library
  },
  {
    name: "Find",
    path: "/find",
    alias: "/search",
    component: Find
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

//Reroute nonmatched to root
router.beforeEach((to, _from, next) => {
  if (to.matched.length === 0) {
    next("/");
  } else {
    next();
  }
});

router.afterEach(to => {
  document.title = `Feedia | ${to.name}`;
});

export default router;

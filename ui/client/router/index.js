import { createRouter, createWebHistory } from "vue-router";
import Feed from "../components/feed/Feed.vue";
import Library from "../components/library/Library.vue";
import Find from "../components/find/Find.vue";
import { ROUTES } from "../util/constants/navigation";

export const routes = [
  {
    name: "Feed",
    path: ROUTES.FEED,
    alias: ROUTES.ROOT,
    component: Feed
  },
  {
    name: "Library",
    path: ROUTES.LIBRARY,
    component: Library
  },
  {
    name: "Find",
    path: ROUTES.FIND,
    alias: ROUTES.SEARCH,
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

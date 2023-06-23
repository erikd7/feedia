import { createRouter, createWebHistory } from "vue-router";
import Feed from "../components/feed/Feed.vue";
import Library from "../components/library/Library.vue";
import Find from "../components/find/Find.vue";
import Details from "../components/details/Details.vue";
import { ROUTES } from "../util/constants/navigation";
import * as guards from "./guards";

export const routes = [
  {
    name: "Discover",
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
  },
  {
    name: "Details",
    path: ROUTES.DETAILS + "/:mediaType/:id",
    alias: ROUTES.DETAILS,
    component: Details,
    hideTab: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _from, next) => {
  guards.redirectToRoot(to, _from, () => guards.renameTitle(to, _from, next));
});

router.afterEach(to => {
  guards.updateRouteStore(to);
});

export default router;

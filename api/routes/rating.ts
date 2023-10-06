import { createRouter } from "./route-helper";
import { Router } from "../types/express";
import { getAverageRating, setUserTitleRating } from "../controllers/rating";

const router: Router = createRouter();

//Get average rating
router.buildRoute(
  "get",
  "/average",
  "getting title average rating",
  getAverageRating
);

//Set rating
router.buildRoute("put", "/", "setting title rating", setUserTitleRating);

export default router;

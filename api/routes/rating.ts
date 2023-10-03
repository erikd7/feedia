import { createRouter } from "./route-helper";
import { Router } from "../types/express";
import { getAverageRating } from "../controllers/rating";

const router: Router = createRouter();

//Get average rating
router.buildRoute(
  "get",
  "/average",
  "getting title average rating",
  getAverageRating
);

export default router;

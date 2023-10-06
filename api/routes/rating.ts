import { createRouter } from "./route-helper";
import { Router } from "../types/express";
import { getRatingInfo, setUserTitleRating } from "../controllers/rating";

const router: Router = createRouter();

//Get average rating
router.buildRoute("get", "/", "getting title average rating", getRatingInfo);

//Set rating
router.buildRoute("put", "/", "setting title rating", setUserTitleRating);

export default router;

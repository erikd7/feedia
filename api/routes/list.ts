import { createRouter } from "./route-helper";
import { Router } from "../types/express";
import { createList, getUserLists, getList } from "../controllers/list";

const router: Router = createRouter();

//Create list
router.buildRoute("post", "/", "creating user list", createList);

//Get user's lists
router.buildRoute("get", "/", "getting user's lists", getUserLists);

//Get list details
router.buildRoute("get", "/:id", "getting list details", getList);

export default router;

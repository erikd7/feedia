import { createRouter } from "./route-helper";
import { getUser, getSelf } from "../controllers/users";
import { Router } from "../types/express";

const router: Router = createRouter();

// Get user information
router.buildRoute("get", "/", "retrieving user information", getSelf); //Own user info
router.buildRoute("get", "/:userId", "retrieving user information", getUser); //Specified user info

export default router;

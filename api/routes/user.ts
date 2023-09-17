import { createRouter } from "./route-helper";
import { getUser } from "../controllers/users";
import { Router } from "../types/express";

const router: Router = createRouter();

// Get user information
router.buildRoute("get", "/:userId", "retrieving user information", getUser);

export default router;

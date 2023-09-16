import { createRouter } from "./route-helper";
import { getUser } from "../controllers/users";

const router = createRouter();

// Get user information
router.buildRoute("get", "/:userId", "retrieving user information", getUser);

export default router;

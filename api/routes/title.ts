import { createRouter } from "./route-helper";
import { Router } from "../types/express";
import {
  getTitleIdsByExternalIds,
  loadTitlesByExternalIds
} from "../controllers/title";

const router: Router = createRouter();

//Upsert title information by external ID
router.buildRoute(
  "post",
  "/load-by-external",
  "loading title information by external ID",
  loadTitlesByExternalIds
);

// Get user information
router.buildRoute(
  "post",
  "/get-by-external",
  "retrieving title information by external ID",
  getTitleIdsByExternalIds
);

export default router;

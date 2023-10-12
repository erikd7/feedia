import { createRouter } from "./route-helper";
import { Router } from "../types/express";
import {
  getTitleIdsByExternalIds,
  loadTitlesByExternalIds,
  getTitleInfo
} from "../controllers/title";

const router: Router = createRouter();

//Get title info
router.buildRoute(
  "get",
  "/:id",
  "retrieving title information by ID",
  getTitleInfo
);

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

import express from "express";
import { getUser } from "../controllers/users";
import { errorWrapper } from "../middleware/error";
import setContextMiddleware from "../middleware/context";

const router = express.Router();

// Get user information
router.get(
  "/:userId",
  setContextMiddleware("retrieving user information"),
  errorWrapper(async (req, res) => {
    const { status, body } = await getUser(req);

    res.status(status).json(body);
  })
);

export default router;

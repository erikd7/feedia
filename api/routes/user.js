import express from "express";
import { getUser } from "../controllers/users";
import { errorWrapper } from "./error";

const router = express.Router();

// Get user information
router.get(
  "/:userId",
  errorWrapper(async (req, res) => {
    const { status, body } = await getUser(req);

    res.status(status).json(body);
  })
);

export default router;

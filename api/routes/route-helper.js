import express from "express";
import { errorWrapper } from "../middleware/error";
import setContextMiddleware from "../middleware/context";

function buildRoute(verb, path, context, controller) {
  this[verb](
    path,
    setContextMiddleware(context),
    errorWrapper(async (req, res) => {
      const { status, body } = await controller(req);

      res.status(status).json(body);
    })
  );
}

export const createRouter = () => {
  const router = express.Router();
  router.buildRoute = buildRoute;

  return router;
};

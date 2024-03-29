import express from "express";
import { Router } from "../types/express";
import { errorWrapper } from "../middleware/error";
import setContextMiddleware from "../middleware/context";
import { Controller } from "../controllers/controller";

export const createRouter = () => {
  const router = express.Router({ mergeParams: true }) as Router;

  router.buildRoute = function buildRoute(
    this: any,
    verb: string,
    path: string,
    context: string,
    controller: Controller
  ) {
    this[verb](
      path,
      setContextMiddleware(context),
      errorWrapper(async (req, res, next) => {
        //@ts-ignore
        const { status, body } = await controller(req, res, next);

        //@ts-ignore
        res.status(status).json(body);
      })
    );
  };

  return router;
};

//Middleware to set the action context for a request. This is later used by the error handling middleware.
import { Request } from "../types/express";
import { Response, NextFunction } from "express";

export type ActionContext = string;

export default function createContextMiddleware(context: ActionContext) {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.actionContext = context;
    next();
  };
}

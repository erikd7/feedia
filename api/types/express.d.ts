import { Request, Router, ErrorRequestHandler } from "@types/express";
import { ActionContext } from "../middleware/context";

export interface Request extends Request {
  actionContext: ActionContext;
}
export interface Router extends Router {
  buildRoute: function;
}

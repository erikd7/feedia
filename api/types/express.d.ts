import {
  Request as DefaultRequest,
  Router as DefaultRouter
} from "@types/express";
import { ActionContext } from "../middleware/context";

export interface Request extends DefaultRequest {
  actionContext: ActionContext;
}
export interface Router extends DefaultRouter {
  buildRoute: function;
}

export type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

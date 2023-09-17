import { Request } from "../types/express";
import { Response, NextFunction, ErrorRequestHandler } from "express";
//@ts-ignore
import { ApiError } from "../models/error";
//Error Middleware (must be defined with 4 arguments)
export const errorMiddleware: ErrorRequestHandler = (
  error,
  req,
  res,
  _next
) => {
  console.log(`Error at Path: '${req.path}'`);
  console.log(`Error Context:\n${error.displayContexts()}\n`);
  console.error("Error: ", error);

  const { status, body } = error.httpResponse();

  res.status(status).send(body);
};

type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export function errorWrapper<T extends ExpressMiddleware>(
  fn: T
): ExpressMiddleware {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (err) {
      // If native error class, transform it to custom error
      const error: ApiError = ApiError.build(err);
      error.prependContext(req.actionContext);
      next(error); // Pass the error to the error middleware
    }
  };
}

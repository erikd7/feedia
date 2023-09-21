import ApiError from "../models/error";
import { ExpressMiddleware } from "../types/express";
import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

//Error Middleware (must be defined with 4 arguments)
export const errorMiddleware: ErrorRequestHandler = (
  error,
  req,
  res,
  _next
) => {
  console.log(`Error at Path: '${req.path}'`);
  console.error("Error: ", error);

  //Handling for custom error
  if (error instanceof ApiError) {
    console.log(`Error Context:\n${error.displayContexts()}\n`);
    const { status, body } = error.httpResponse();
    res.status(status).send(body);
  }

  //Generic 500 for unhandled error
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
};

export function errorWrapper<T extends ExpressMiddleware>(
  fn: T
): ExpressMiddleware {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (err) {
      // If native error class, transform it to custom error
      //@ts-ignore
      const error: ApiError = ApiError.build(err);
      error.prependContext(req.actionContext);
      next(error); // Pass the error to the error middleware
    }
  };
}

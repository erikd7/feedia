//Error Middleware (must be defined with 4 arguments)
export const errorMiddleware = (error, req, res, _next) => {
  console.log(`Error at Path: '${req.path}'`);
  console.log(`Error Context:\n${error.displayContexts()}\n`);
  console.error("Error: ", error);

  const { status, body } = error.httpResponse();

  res.status(status).send(body);
};

export function errorWrapper(fn) {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (err) {
      //If native error class, transform it to custom error
      const error = ApiError.build(err);
      error.prependContext(req.actionContext);
      next(error); //Pass the error to the error middleware
    }
  };
}

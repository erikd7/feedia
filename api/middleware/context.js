//Middleware to set the action context for a request. This is later used by the error handling middleware.
export default function (context) {
  return (req, _res, next) => {
    req.actionContext = context;

    next();
  };
}

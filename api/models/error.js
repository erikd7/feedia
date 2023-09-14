const DEFAULT_REASON = "server-error";

export default class ApiError extends Error {
  constructor(message, reason, context, ...args) {
    super(message, ...args);

    //Custom error fields for handling request errors
    this.reason = reason; //String that maps to HTTP status code

    //Context: Optional human-readable descriptions of context. E.g. "querying database"
    if (Array.isArray(context)) {
      this.contexts = context;
    } else {
      this.contexts = [context];
    }
  }

  //Build an ApiError from an error that is a native or a custom error
  static build(error, context) {
    if (error instanceof ApiError) {
      return error;
    }
    if (error instanceof Error) {
      return new this(error.message, DEFAULT_REASON, context);
    }
  }

  prependContext(newContext) {
    this.contexts = [newContext, ...this.contexts];
  }
  displayContexts() {
    return this.contexts?.join("/\n\t");
  }

  httpResponse() {
    const status = this.httpCode();
    const body = {
      reason: this.reason,
      message: this.message
    };

    return { status, body };
  }

  httpCode() {
    switch (this.reason) {
      case "success":
        return 200;
      case "no-content":
        return 204;
      case "partial-success":
        return 207;
      case "bad-request":
        return 400;
      case "unauthorized":
        return 401;
      case "forbidden":
        return 403;
      case "not-found":
        return 404;
      case "conflict":
        return 409;
      case "server-error":
      default:
        return 500;
    }
  }
}

import { ReasonPhrases, getStatusCode } from "http-status-codes";

const DEFAULT_REASON = ReasonPhrases.INTERNAL_SERVER_ERROR;

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
      console.log("Creating ApiError from Error:");
      console.error(error);
      return new this(error.message, DEFAULT_REASON, context);
    }
  }

  prependContext(newContext) {
    if (newContext) {
      this.contexts = [newContext, ...this.contexts];
    }
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
    return getStatusCode(this.reason);
  }
}

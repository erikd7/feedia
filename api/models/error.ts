import { ReasonPhrases, getStatusCode } from "http-status-codes";

const DEFAULT_REASON = ReasonPhrases.INTERNAL_SERVER_ERROR;

type Message = string;
type Reason = string;
type Contexts = Array<string>;
type ContextInput = Contexts | string;

export default class ApiError extends Error {
  private reason: Reason;
  private contexts: Contexts;

  constructor(
    message: Message,
    reason: Reason,
    context: ContextInput,
    ...args: Array<any>
  ) {
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
  static build(error: Error, context: ContextInput) {
    if (error instanceof ApiError) {
      return error;
    }
    if (error instanceof Error) {
      console.log("Creating ApiError from Error:");
      console.error(error);
      return new this(error.message, DEFAULT_REASON, context);
    }
  }

  prependContext(newContext: string) {
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

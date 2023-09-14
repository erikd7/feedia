import { getFailureBody } from "./controller-helper";

export const handleError = error => {
  let reason = "server-error",
    message = error.message || "An internal error occurred.";

  return getFailureBody({ reason, message });
};

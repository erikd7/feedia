import { StatusCodes } from "http-status-codes";

export const createResponse = data => {
  let status;
  //Undefined, null, or empty array
  if (
    typeof data === "undefined" ||
    data === null ||
    (Array.isArray(data) && !data.length)
  ) {
    status = StatusCodes.NO_CONTENT;
  } else {
    status = StatusCodes.OK;
  }

  return { status, body: data };
};

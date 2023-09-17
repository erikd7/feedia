import { StatusCodes } from "http-status-codes";
import { ResponseObject } from "./controller";

export const createResponse = (data: any): ResponseObject => {
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

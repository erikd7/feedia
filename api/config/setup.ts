import ApiError from "../models/error";

export default function () {
  //Set ApiError as global
  //@ts-ignore
  global.ApiError = ApiError;
}

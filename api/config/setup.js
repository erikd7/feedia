import ApiError from "../models/error";

export default function () {
  //Set ApiError as global
  global.ApiError = ApiError;
}

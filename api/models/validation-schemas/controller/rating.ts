//@ts-ignore
import Joi from "joi-oid";
import { ulid, rating } from "../base";

export const setRating = Joi.object({
  id: ulid.required(),
  rating: rating.required().allow(null) //Allow null to unset the rating
});

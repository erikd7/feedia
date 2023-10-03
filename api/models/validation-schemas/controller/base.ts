//@ts-ignore
import Joi from "joi-oid";
import { ulid } from "../base";

//Generic IDs

export const idParam = Joi.object({
  id: ulid.required()
});

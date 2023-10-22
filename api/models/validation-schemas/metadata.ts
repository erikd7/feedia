//@ts-ignore
import Joi from "joi-oid";
import { title } from "./base";

export const main = Joi.object({
  title,
  imagePath: Joi.string().optional().allow("")
}).optional();

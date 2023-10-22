//@ts-ignore
import Joi from "joi-oid";
import { listName, ulid } from "../base";

export const createList = Joi.object({
  name: listName.required()
});

export const getListParams = Joi.object({
  id: ulid.required()
});

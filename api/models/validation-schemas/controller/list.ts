//@ts-ignore
import Joi from "joi-oid";
import { listName, ulid } from "../base";

export const createList = Joi.object({
  name: listName.required()
});

export const getListParams = Joi.object({
  id: ulid.required()
});

export const updateListParams = Joi.object({
  id: ulid.required()
});

export const updateListBody = Joi.object({
  name: listName.required()
});

export const titleListUpdateBody = Joi.object({
  titleId: ulid.required()
});

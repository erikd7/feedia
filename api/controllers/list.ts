import { createResponse } from "./controller-helper";
import { Controller } from "./controller";
import validateSchema from "../util/validate";
import {
  createList as createListSchema,
  getListParams as getListParamsSchema
} from "../models/validation-schemas/controller/list";
import {
  createList as createListDomain,
  getUserLists as getUserListsDomain,
  getList as getListDomain
} from "../domain/list";

export const createList: Controller = async req => {
  //Validate body
  validateSchema(req.body, createListSchema.required(), "list info");

  const { user } = req;
  const { name } = req.body;

  //@ts-ignore
  const result = await createListDomain(user.id, name);

  //Return success
  return createResponse(result);
};

export const getUserLists: Controller = async req => {
  const { user } = req;

  //@ts-ignore
  const result = await getUserListsDomain(user.id);

  //Return success
  return createResponse(result);
};

export const getList: Controller = async req => {
  validateSchema(req.params, getListParamsSchema.required(), "list ID");

  const { user } = req;
  const { id } = req.params;

  //@ts-ignore
  const result = await getListDomain(id, user.id);

  //Return success
  return createResponse(result);
};

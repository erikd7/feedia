import { createResponse } from "./controller-helper";
import { Controller } from "./controller";
import validateSchema from "../util/validate";
import * as listSchemas from "../models/validation-schemas/controller/list";
import {
  createList as createListDomain,
  getUserLists as getUserListsDomain,
  getList as getListDomain,
  updateList as updateListDomain,
  addTitleToList as addTitleToListDomain,
  removeTitleFromList as removeTitleFromListDomain,
  deleteList as deleteListDomain
} from "../domain/list";

export const createList: Controller = async req => {
  //Validate body
  validateSchema(req.body, listSchemas.createList.required(), "list info");

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
  validateSchema(req.params, listSchemas.getListParams.required(), "list ID");

  const { user } = req;
  const { id } = req.params;

  //@ts-ignore
  const result = await getListDomain(id, user.id);

  //Return success
  return createResponse(result);
};

export const updateList: Controller = async req => {
  validateSchema(
    req.params,
    listSchemas.updateListParams.required(),
    "list ID"
  );
  validateSchema(
    req.body,
    listSchemas.updateListBody.required(),
    "list details"
  );

  const { user } = req;
  const { id } = req.params;
  const { name } = req.body;

  //@ts-ignore
  const result = await updateListDomain(id, user.id, name);

  //Return success
  return createResponse(result);
};

export const addTitleToList: Controller = async req => {
  validateSchema(req.params, listSchemas.getListParams.required(), "list ID");
  const { id: listId } = req.params;

  validateSchema(
    req.body,
    listSchemas.titleListUpdateBody.required(),
    "title ID"
  );

  const { user } = req;
  const { titleId } = req.body;

  //@ts-ignore
  const result = await addTitleToListDomain(listId, user.id, titleId);

  //Return success
  return createResponse(result);
};

export const removeTitleFromList: Controller = async req => {
  validateSchema(req.params, listSchemas.getListParams.required(), "list ID");
  const { id: listId } = req.params;

  validateSchema(
    req.query,
    listSchemas.titleListUpdateBody.required(),
    "title ID"
  );

  const { user } = req;
  const { titleId } = req.query;

  //@ts-ignore
  const result = await removeTitleFromListDomain(listId, user.id, titleId);

  //Return success
  return createResponse(result);
};

export const deleteList: Controller = async req => {
  validateSchema(req.params, listSchemas.getListParams.required(), "list ID");

  const { user } = req;
  const { id } = req.params;

  //@ts-ignore
  const result = await deleteListDomain(id, user.id);

  //Return success
  return createResponse(result);
};

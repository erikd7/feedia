import { ReasonPhrases } from "http-status-codes";
import { runQuery, queries } from "../database/postgres";
import { DynamicId } from "../database/schemas";
import ApiError from "../models/error";
import { PostgresError } from "pg-error-enum";

export const createList = async (userId: DynamicId, name: string) => {
  //Retrieve info
  const result = await runQuery(
    queries.list.create(userId, name),
    "list",
    true
  );

  return result.list;
};

export const getUserLists = async (userId: DynamicId) => {
  //Retrieve info
  const result = await runQuery(queries.list.getForUser(userId), "lists");

  return result.lists;
};

export const getList = async (id: DynamicId, userId: DynamicId) => {
  //Retrieve info
  const result = await runQuery(
    queries.list.getDetails(id, userId),
    "list",
    true
  );

  if (!result.list) {
    throw new ApiError(
      "List not found.",
      ReasonPhrases.NOT_FOUND,
      "Retrieving list"
    );
  }

  return result.list;
};

export const updateList = async (
  id: DynamicId,
  userId: DynamicId,
  name: string
) => {
  //Check access
  await checkAccess(id, userId);

  const result = await runQuery(queries.list.update(id, name), "list", true);

  return result.list;
};

export const addTitleToList = async (
  listId: DynamicId,
  userId: DynamicId,
  titleId: DynamicId
) => {
  let result;
  //Check access
  await checkAccess(listId, userId);

  try {
    result = await runQuery(queries.list.addTitleToList(listId, titleId));
  } catch (err) {
    //Handle foreign key constraint (invalid title or list ID)
    //@ts-ignore
    if (err.code == PostgresError.FOREIGN_KEY_VIOLATION) {
      throw new ApiError(
        "List or title not found",
        ReasonPhrases.BAD_REQUEST,
        "Inserting title into list"
      );
    }
    //@ts-ignore
    if (err.code == PostgresError.UNIQUE_VIOLATION) {
      throw new ApiError(
        "Title is already in list",
        ReasonPhrases.CONFLICT,
        "Inserting title into list"
      );
    }
  }

  if (!result?.rowsAffected) {
    throw new ApiError(
      "List not found.",
      ReasonPhrases.NOT_FOUND,
      "Retrieving list"
    );
  }
};

export const deleteList = async (
  listId: DynamicId,
  deletingUserId: DynamicId
) => {
  //Check access
  await checkAccess(listId, deletingUserId);

  const result = await runQuery(queries.list.delete(listId), "list", true);

  return result.list;
};

//Ensures the acting user is the list owner
const checkAccess = async (listId: DynamicId, userId: DynamicId) => {
  //Retrieve existing list info
  const existingListResult = await runQuery(
    queries.list.get(listId),
    "list",
    true
  );

  const listOwnerId = existingListResult.list.userId;

  if (!listOwnerId || listOwnerId !== userId) {
    throw new ApiError(
      "User is not the list owner and does not have access",
      ReasonPhrases.FORBIDDEN,
      "Retrieving list"
    );
  }
};

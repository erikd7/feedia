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

export const addTitleToList = async (listId: DynamicId, titleId: DynamicId) => {
  let result;
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

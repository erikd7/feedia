import { ReasonPhrases } from "http-status-codes";
import { runQuery, queries } from "../database/postgres";
import { DynamicId } from "../database/schemas";
import ApiError from "../models/error";

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

import { createResponse } from "./controller-helper";
import { Controller } from "./controller";
import validateSchema from "../util/validate";
import { idParam as idParamSchema } from "../models/validation-schemas/controller/base";
import { setRating as setRatingSchema } from "../models/validation-schemas/controller/rating";
import { runQuery, queries } from "../database/postgres";
import { Request } from "../types/express";

const getTitleId = (req: Request) => req.params.id;

export const getRatingInfo: Controller = async req => {
  //Validate body
  validateSchema(req.params, idParamSchema.required(), "title ID");

  const { user } = req;
  const titleId = getTitleId(req);

  //Call query
  const result = await runQuery(
    //@ts-ignore
    queries.getRatingInfo(user.id, titleId),
    "title",
    true
  );

  //Return success
  return createResponse(result.title);
};

export const setUserTitleRating: Controller = async req => {
  //Validate body
  validateSchema(
    { ...req.params, ...req.body },
    setRatingSchema.required(),
    "rating"
  );

  const { user } = req;
  const titleId = getTitleId(req);
  const { rating } = req.body;

  //Set user rating
  //@ts-ignore
  await runQuery(queries.setUserTitleRating(user.id, titleId, rating));

  //Get new rating info
  const ratingResponse = await runQuery(
    //@ts-ignore
    queries.getRatingInfo(user.id, titleId),
    "rating",
    true
  );

  //Return success
  return createResponse(ratingResponse.rating);
};

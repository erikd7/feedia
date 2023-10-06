import { createResponse } from "./controller-helper";
import { Controller } from "./controller";
import validateSchema from "../util/validate";
import { idParam as idParamSchema } from "../models/validation-schemas/controller/base";
import { setRating as setRatingSchema } from "../models/validation-schemas/controller/rating";
import { runQuery, queries } from "../database/postgres";

export const getAverageRating: Controller = async req => {
  //Validate body
  validateSchema(req.params, idParamSchema.required(), "title ID");

  const { id } = req.params;

  //Call query
  const result = await runQuery(queries.getAverageRating(id), "title", true);

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
  const { id: titleId } = req.params;
  const { rating } = req.body;

  //Call query
  //@ts-ignore
  await runQuery(queries.setUserTitleRating(user.id, titleId, rating));

  //Return success
  return createResponse();
};

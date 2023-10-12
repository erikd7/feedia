import { createResponse } from "./controller-helper";
import { Controller } from "./controller";
import validateSchema from "../util/validate";
import {
  externalTitleData as externalTitleDataSchema,
  externalTitleDataLoad as externalTitleDataLoadSchema
} from "../models/validation-schemas/controller/title";
import {
  getTitleIdsByExternalIds as getTitleIdsByExternalIdsDomain,
  loadTitlesByExternalIds as loadTitlesByExternalIdsDomain
} from "../domain/title";
import { runQuery, queries } from "../database/postgres";

export const getTitleInfo: Controller = async req => {
  const { id } = req.params;

  //@ts-ignore
  const result = await runQuery(queries.getTitleInfo(id), "title", true);

  //Return success
  return createResponse(result.title);
};

export const loadTitlesByExternalIds: Controller = async req => {
  //Validate body
  validateSchema(
    req.body,
    externalTitleDataLoadSchema.required(),
    "external title data"
  );

  const result = await loadTitlesByExternalIdsDomain(req.body);

  //Return success
  return createResponse(result);
};

export const getTitleIdsByExternalIds: Controller = async req => {
  //Validate body
  const { externalTitles } = req.body;
  validateSchema(
    externalTitles,
    externalTitleDataSchema,
    "external title data"
  );

  const result = await getTitleIdsByExternalIdsDomain(externalTitles);

  //Return success
  return createResponse(result);
};

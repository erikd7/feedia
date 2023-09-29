//Joi schemas for title APIs
//@ts-ignore
import Joi from "joi-oid";
import * as baseSchemas from "../base";

export const externalTitleDataLoad = Joi.object({
  dataSource: baseSchemas.dataSource.required(),
  externalId: baseSchemas.externalId.required(),
  mediaType: baseSchemas.mediaType.required(),
  title: baseSchemas.title.required()
});

export const externalTitleData = Joi.array().items(
  Joi.object({
    dataSource: baseSchemas.dataSource.required(),
    externalId: baseSchemas.externalId.optional() //Filter out results with no external ID
  }).required()
);

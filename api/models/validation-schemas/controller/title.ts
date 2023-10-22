//Joi schemas for title APIs
//@ts-ignore
import Joi from "joi-oid";
import * as baseSchemas from "../base";
import * as metadataSchemas from "../metadata";

export const externalTitleDataLoad = Joi.object({
  dataSource: baseSchemas.dataSource.required(),
  externalId: baseSchemas.externalId.required(),
  mediaType: baseSchemas.mediaType.required(),
  title: baseSchemas.title.required(),
  metadata: metadataSchemas.main.optional()
});

export const externalTitleData = Joi.array().items(
  Joi.object({
    dataSource: baseSchemas.dataSource.required(),
    externalId: baseSchemas.externalId.optional() //Filter out results with no external ID
  }).required()
);

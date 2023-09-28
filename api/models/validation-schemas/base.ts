//@ts-ignore
import Joi from "joi-oid";

//Generic IDs
export const dbId = Joi.number();
export const ulid = Joi.string().guid();

//External Data
export const dataSource = Joi.string();
export const dataSourceId = dbId;
export const externalId = Joi.string();

//Media Types
export const mediaTypeId = dbId;
export const mediaType = Joi.string();

//Title Information
export const title = Joi.string();

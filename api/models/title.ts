//@ts-ignore
import Joi from "joi-oid";
import validateSchema from "../util/validate";
import { runQuery, queries } from "../database/postgres";
import { ReasonPhrases } from "http-status-codes";
import { DynamicId } from "../database/schemas";

type TitleName = String;

export type TitleExternalInput = {
  dataSource: String;
  externalId: String;
  mediaType: String;
  title?: TitleName;
};

type TitleInput = {
  id?: DynamicId;
  mediaType?: Number;
  title?: TitleName;
};

type TitleDatabaseRow = {
  id: DynamicId;
  title: TitleName;
  mediaType: Number;
};

export default class Title {
  private id?: DynamicId;
  private title?: TitleName;
  private mediaType?: Number;

  constructor({ id, mediaType, title }: TitleInput = {}) {
    this.id = id as DynamicId;
    this.mediaType = mediaType;
    this.title = title;
  }
}
import { dbId } from "./base-schemas";
import validateSchema from "../util/validate";
import { runQuery, queries } from "../database/postgres";
import { ReasonPhrases } from "http-status-codes";
import { createToken } from "../auth/token";
import { DynamicId } from "../database/schemas";

type Name = String | undefined;
type Email = string;

type UserInput = {
  id?: DynamicId;
  nameFirst?: Name;
  nameLast?: Name;
  email?: Email;
  photoUrl?: string;
};

type UserDatabaseRow = {
  id: DynamicId;
  nameFirst: Name;
  nameLast: Name;
  email: Email;
  photoUrl: string;
  dataSourceId: number;
  externalId: string;
};

export default class User {
  private id?: DynamicId;
  private nameFirst?: Name;
  private nameLast?: Name;
  private email?: Email;
  private photoUrl?: string;
  private dataSourceId?: number;
  private externalId?: string;

  constructor({ id, nameFirst, nameLast, email, photoUrl }: UserInput = {}) {
    this.id = id as DynamicId;
    this.nameFirst = nameFirst;
    this.nameLast = nameLast;
    this.email = email;
    this.photoUrl = photoUrl;
  }

  //Validation----------------------------------------------------------------
  //Validate user ID (throws bad-request)
  validateId() {
    return validateSchema(this.id, dbId.label("User ID"), "user ID");
  }

  //Data retrieval------------------------------------------------------------
  //Retrieve user info from DB by ID
  async retrieve() {
    if (!this.id) {
      //@ts-ignore
      throw new ApiError(
        "User must have an ID to retrieve data.",
        ReasonPhrases.BAD_REQUEST,
        "retrieving user info from DB"
      );
    }
    //Get data from Postgres
    const sqlResult = await runQuery(queries.getUser(this.id), "user", true);
    if (sqlResult.rowsAffected < 1) {
      return null;
    }

    return sqlResult.user;
  }

  //Data set------------------------------------------------------------------
  //Map DB data to user class properties
  populateFromDbRow(dbRow: UserDatabaseRow) {
    this.id = dbRow.id;
    this.nameFirst = dbRow.nameFirst;
    this.nameLast = dbRow.nameLast;
    this.email = dbRow.email;
    this.photoUrl = dbRow.photoUrl;
    this.dataSourceId = dbRow.dataSourceId;
    this.externalId = dbRow.externalId;
  }
  static createFromDbRow(dbRow: UserDatabaseRow) {
    const user = new this();
    user.populateFromDbRow(dbRow);
    return user;
  }
  //Retrieve and set data by ID
  async retrieveAndSet() {
    const userInfo = await this.retrieve();
    if (!userInfo) {
      //@ts-ignore
      throw new ApiError(
        `Unable to find user info for user ${this.id}.`,
        ReasonPhrases.NOT_FOUND
      );
    }
    this.populateFromDbRow(userInfo);
  }

  //Create a JWT
  createToken() {
    return createToken({
      id: this.id,
      nameFirst: this.nameFirst,
      nameLast: this.nameLast,
      photoUrl: this.photoUrl,
      dataSourceId: this.dataSourceId,
      externalId: this.externalId
    });
  }
}

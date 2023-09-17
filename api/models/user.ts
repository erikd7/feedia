import { dbId } from "./base-schemas";
import validateSchema from "../util/validate";
import { runQuery, queries } from "../database/postgres";
import { ReasonPhrases } from "http-status-codes";

type Id = Number;
type Name = String | undefined;

type UserInput = {
  name?: Name;
};

type DatabaseRow = {
  id: Id;
  name: Name;
};

export default class User {
  private id: Id;
  private name: Name;

  constructor(id: any, { name }: UserInput = {}) {
    this.id = parseInt(id);
    this.name = name;
  }

  //Validation----------------------------------------------------------------
  //Validate user ID (throws bad-request)
  validateId() {
    return validateSchema(this.id, dbId.label("User ID"), "user ID");
  }

  //Data retrieval------------------------------------------------------------
  //Retrieve user info from DB by ID
  async retrieve() {
    //Get data from Postgres
    const sqlResult = await runQuery(queries.getUser(this.id), "user", true);
    if (sqlResult.rowsAffected < 1) {
      return null;
    }

    return sqlResult.user;
  }

  //Data set------------------------------------------------------------------
  //Map DB data to user class properties
  populateFromDbRow(dbRow: DatabaseRow) {
    this.name = dbRow.name;
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
}

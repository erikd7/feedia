import { dbId } from "./base-schemas";

export default class User {
  static getIdSchema() {
    return dbId.label("User ID");
  }
}

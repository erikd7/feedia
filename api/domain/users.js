import { runQuery, queries } from "../database/postgres";

export const getUser = async userId => {
  //Get data from Postgres
  const sqlResult = await runQuery(queries.getUser(userId), "user", true);

  if (sqlResult.rowsAffected < 1) {
    return {
      ok: false,
      reason: "not-found",
      message: "Could not find the user in the SQL database."
    };
  }

  return { ok: true, user: sqlResult.user };
};

import pg, { Pool } from "pg";
import queries from "./queries";

require("dotenv").config();

//Override pg default to not automatically adjust timezone when selecting timestamp without timezone columns
pg.types.setTypeParser(1114, function (stringValue) {
  return new Date(stringValue + "z"); //Add 'z' to return timestamp in UTC
});

let postgresDb, runQuery, runTransactionalizedQueries;

//Connection
export async function connectPostgres() {
  let connectionConfig;
  connectionConfig = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT || 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  };

  //Query wrapper
  runQuery = async (query, rowKey = "rows", isSingular = false, values) => {
    const result = await postgresDb.query(query, values);
    return {
      ok: true,
      rowsAffected: result.rowCount,
      [rowKey]: isSingular ? result.rows[0] : result.rows
    };
  };

  runTransactionalizedQueries = async queries => {
    const client = await postgresDb.connect();
    try {
      for await (const query of queries) {
        await client.query("BEGIN"); // start a new transaction

        const result = await client.query(query);
        if (!result?.rowCount) {
          throw `Transactionalized query failed: ${result}`;
        }
      }

      await client.query("COMMIT"); // commit the transaction

      client.release();
      return { ok: true };
    } catch (error) {
      await client.query("ROLLBACK"); // rollback the transaction

      client.release();
      return { ok: false, reason: "server-error", message: error.message };
    }
  };

  postgresDb = new Pool(connectionConfig);
  console.log("Connected to Postgres DB.");
}

//Constants
export const statusIds = {
  ACTIVE: 1,
  PAUSED: 2,
  DELETED: 3
};
export const relationshipTypeIds = {
  LIKE: 1,
  SKIP: 2,
  MATCH: 3,
  NONMATCH: 4
};

export { queries, runQuery, runTransactionalizedQueries };
export default postgresDb;

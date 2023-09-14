import { connectPostgres } from "../database/postgres";
import getConstants from "../database/constants";

const buildDeps = async app => {
  //Postgres
  await connectPostgres();

  //The below functions depend on the Postgres connection
  //DB constants
  const dbConstants = await getConstants();
  app.set("dbConstants", dbConstants);
};

export default buildDeps;

import setup from "./setup";
import { connectPostgres } from "../database/postgres";
import getConstants from "../database/constants";
import { Application } from "express";

const buildDeps = async (app: Application) => {
  //Extensibility setup
  setup();

  //Postgres
  await connectPostgres();

  //The below functions depend on the Postgres connection
  //DB constants
  const dbConstants = await getConstants();
  app.set("dbConstants", dbConstants);
};

export default buildDeps;

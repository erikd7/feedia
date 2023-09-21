import { Application } from "express";
import app from "../app";
import setup from "./setup";
import { connectPostgres } from "../database/postgres";
import getConstants from "../database/constants";
import config from "../config/config";

const buildDeps = async (app: Application) => {
  //Extensibility setup
  setup();

  //Set up config
  app.set("config", config);

  //Postgres
  await connectPostgres();

  //The below functions depend on the Postgres connection
  //DB constants
  const dbConstants = await getConstants();
  app.set("dbConstants", dbConstants);
};

const getDeps = (key: string) => {
  return app.get(key);
};

export { buildDeps, getDeps };

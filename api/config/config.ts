import { merge } from "lodash";
import AppConfig from "./config.d";
import defaultConfig from "./default.json";
import devConfig from "./dev.json";

const getEnv = () => process.env.ENV || process.env.NODE_ENV || "production";

const getConfigForEnv = (env: string) => {
  switch (env) {
    case "dev":
      return devConfig;
    default:
      return null;
  }
};

const buildConfig = (env = getEnv()) => {
  const overrideConfig = getConfigForEnv(env);

  //If there is not a valid override, return default config
  if (!overrideConfig) {
    return defaultConfig;
  }

  //Merge configs
  const mergedConfig = merge(defaultConfig, overrideConfig);

  return mergedConfig;
};

const config = buildConfig() as AppConfig;

export default config;

import _ from "lodash";
import defaultConfig from "../config/default.json" assert { type: "json" };
import devConfig from "../config/dev.json" assert { type: "json" };

export const getEnv = () =>
  process.env.ENV || process.env.NODE_ENV || "production";

const getConfigForEnv = env => {
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
  const mergedConfig = _.merge(defaultConfig, overrideConfig);

  return mergedConfig;
};

const config = buildConfig();
export default config;

import { merge } from "lodash";
import defaultConfig from "./default.json";
import devConfig from "./dev.json";

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
  console.log(`building config with env`, env, overrideConfig); /* //!DELETE */

  //If there is not a valid override, return default config
  if (!overrideConfig) {
    return defaultConfig;
  }

  //Merge configs
  const mergedConfig = merge(defaultConfig, overrideConfig);

  return mergedConfig;
};

const config = buildConfig();
export default config;

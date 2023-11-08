import { merge } from "lodash";
import AppConfig from "./config.d";
import defaultConfig from "./default.json";
import devConfig from "./dev.json";
import localNetworkConfig from "./local-network.json";

const getEnv = () => process.env.ENV || process.env.NODE_ENV || "production";

const getConfigForEnv = (env: string) => {
  switch (env) {
    case "dev":
      return [devConfig];
    default:
      return [];
  }
};

const buildConfig = (env = getEnv()) => {
  const overrideConfigs = getConfigForEnv(env);

  //If in dev and local network mode is set, use local network config
  if (env === "dev" && process.env.VUE_APP_USE_LOCAL_NETWORK === "true") {
    overrideConfigs.push(localNetworkConfig);
  }

  //If there is not a valid override, return default config
  if (!overrideConfigs?.length) {
    return defaultConfig;
  }

  //Merge configs
  const mergedConfig = merge(defaultConfig, ...overrideConfigs);

  return mergedConfig;
};

const config = buildConfig() as AppConfig;

export default config;

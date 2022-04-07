import { ConfigPlugin, createRunOncePlugin } from "@expo/config-plugins";

import { withAndroidConfig } from "./android";
import { withIOSConfig } from "./ios";
import { MarketingCloudSdkPluginProps } from "./types";

const ERROR_PREFIX = "Marketing Cloud SDK Plugin:";

const withMarketingCloudSdk: ConfigPlugin<
  Partial<MarketingCloudSdkPluginProps> | undefined
> = (config, props) => {
  if (!props) {
    throw new Error(`${ERROR_PREFIX} Must configure plugin options.`);
  }

  const { serverUrl, appId, accessToken } = props;

  if (!serverUrl) {
    throw new Error(`${ERROR_PREFIX} Must provide server url.`);
  }

  if (!appId) {
    throw new Error(`${ERROR_PREFIX} Must provide app id.`);
  }

  if (!accessToken) {
    throw new Error(`${ERROR_PREFIX} Must provide access token.`);
  }

  config = withAndroidConfig(config, {
    ...props,
    serverUrl,
    appId,
    accessToken,
  });

  config = withIOSConfig(config, { ...props, serverUrl, appId, accessToken });

  return config;
};

const pkg = require("../package.json");

export default createRunOncePlugin(
  withMarketingCloudSdk,
  pkg.name,
  pkg.version
);

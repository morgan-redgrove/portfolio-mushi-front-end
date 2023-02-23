// this is somthing to do with firebase. leave it alone
// Learn more https://docs.expo.io/guides/customizing-metro

const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 添加 polyfill 支持
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  punycode: require.resolve('punycode'),
};

// 支持更多模块
config.resolver.unstable_enablePackageExports = true;

module.exports = config;

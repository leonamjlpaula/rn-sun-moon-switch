const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add parent directory to watchFolders so Metro can watch the library source
config.watchFolders = [
  ...(config.watchFolders || []),
  path.resolve(__dirname, '..'),
];

// Ensure source files from the library are transpiled
config.resolver.sourceExts = [...(config.resolver.sourceExts || []), 'ts', 'tsx'];

module.exports = config;


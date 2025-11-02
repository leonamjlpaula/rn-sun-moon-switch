const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, '..');

const config = getDefaultConfig(projectRoot);

// Add parent directory to watchFolders so Metro can watch the library
config.watchFolders = [
  ...(config.watchFolders || []),
  workspaceRoot,
];

// Block parent node_modules to prevent React resolution conflicts
const parentNodeModules = path.resolve(workspaceRoot, 'node_modules');
config.resolver.blockList = [
  ...(config.resolver.blockList || []),
  new RegExp(`${parentNodeModules.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')}/.*`),
];

// CRITICAL: Ensure React, React Native, and react-native-reanimated 
// are ALWAYS resolved from the app's node_modules, not from library's node_modules
config.resolver.extraNodeModules = {
  react: path.resolve(projectRoot, 'node_modules/react'),
  'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
  'react-native-reanimated': path.resolve(projectRoot, 'node_modules/react-native-reanimated'),
};

// Ensure Metro can resolve the local package and CommonJS files
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
];

// Ensure CommonJS files are supported (needed for dist/index.js)
config.resolver.sourceExts = [...(config.resolver.sourceExts || []), 'js', 'json'];

module.exports = config;


const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const { babel } = require('@rollup/plugin-babel');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const { dts } = require('rollup-plugin-dts');
const packageJson = require('./package.json');

module.exports = [
  // Main bundle configuration
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.ts', '.tsx'],
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        // Note: react-native-reanimated/plugin should be added in consuming apps
        // We don't add it here to keep the library build simpler
      }),
    ],
    external: ['react', 'react-native', 'react-native-reanimated'],
  },
  // TypeScript definitions
  {
    input: 'src/index.ts',
    output: {
      file: packageJson.types,
      format: 'es',
    },
    plugins: [dts()],
    external: [/\.(css|less|scss|sass)$/],
  },
];

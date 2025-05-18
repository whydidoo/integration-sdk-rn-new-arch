import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as Repack from '@callstack/repack';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */

const jsRules = Repack.getJsTransformRules();

const babelSettings = jsRules.find(item => item.use?.loader === 'babel-loader');

// babelSettings.use.options.plugins.push('react-native-unistyles/plugin');

// babelSettings.use.options.configFile = true;

export default {
  context: __dirname,
  entry: './index.js',
  resolve: {
    ...Repack.getResolveOptions({preferNativePlatform: true}),
    extensions: [
      '.native.js',
      '.[platform].js',
      '.js',
      '.native.jsx',
      '.[platform].jsx',
      '.jsx',
      '.native.ts',
      '.[platform].ts',
      '.ts',
      '.native.tsx',
      '.[platform].tsx',
      '.tsx',
      '.native.json',
      '.[platform].json',
      '.json',
    ],
  },
  module: {
    rules: [...jsRules, ...Repack.getAssetTransformRules()],
  },
  plugins: [
    new Repack.RepackPlugin(),
    new Repack.plugins.ModuleFederationPluginV2({
      name: 'HostApp',
      shareStrategy: 'loaded-first',
      dts: false,
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: '19.0.0',
        },
        'react-native': {
          singleton: true,
          eager: true,
          requiredVersion: '0.79.2',
        },
        'react-native-svg': {
          singleton: true,
          eager: true,
          requiredVersion: '15.11.2',
        },
      },
    }),
  ],
};

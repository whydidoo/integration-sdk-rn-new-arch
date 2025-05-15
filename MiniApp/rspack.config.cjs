const Repack = require('@callstack/repack');

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */
/** @type {(env: import('@callstack/repack').EnvOptions) => import('@rspack/core').Configuration} */
module.exports = env => {
  return {
    mode: env.mode,
    context: env.context,
    entry: './index.js',
    experiments: {
      incremental: env.mode === 'development',
    },
    resolve: {
      ...Repack.getResolveOptions(),
    },
    devtool: 'source-map',
    module: {
      rules: [
        ...Repack.getJsTransformRules({
          swc: {
            jsxRuntime: 'classic',
          },
        }),
        {
          test: Repack.getAssetExtensionsRegExp(
            Repack.ASSET_EXTENSIONS.filter(ext => ext !== 'svg'),
          ),
          use: '@callstack/repack/assets-loader',
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                native: true,
                dimensions: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'miniapp',
        filename: 'miniapp.container.js.bundle',
        dts: false,
        exposes: {
          './Root': './src/App.tsx',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: '19.0.0',
          },
          'react-native': {
            singleton: true,
            requiredVersion: '0.79.2',
          },
          'react-native-svg': {
            singleton: true,
            requiredVersion: '15.11.2',
          },
        },
      }),
    ],
  };
};

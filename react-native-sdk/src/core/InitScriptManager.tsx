import {init} from '@module-federation/runtime';
import {Platform} from 'react-native';
import {RetryPlugin} from '@module-federation/retry-plugin';

export const initMiniAppScriptManager = () => {
  try {
    init({
      name: 'HostApp',
      remotes: [
        {
          name: 'miniapp',
          alias: 'miniapp',
          entry: `http://10.0.2.2:9000/${Platform.OS}/mf-manifest.json`,
        },
      ],
      plugins: [
        RetryPlugin({
          fetch: {
            retryTimes: 3,
          },
          script: {},
        }),
      ],
    });
  } catch (e) {
    console.log('error init mini app ', e);
  }
};

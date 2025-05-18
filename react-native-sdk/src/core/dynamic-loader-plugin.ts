import {FederationRuntimePlugin} from '@module-federation/enhanced/runtime';

export function plugin(): FederationRuntimePlugin {
  return {
    name: 'custom-plugin-build',
    beforeInit(args) {
      console.log('[build time inject] beforeInit: ', args);
      return args;
    },
    beforeLoadShare(args) {
      console.log('[build time inject] beforeLoadShare: ', args);
      return args;
    },
  };
}

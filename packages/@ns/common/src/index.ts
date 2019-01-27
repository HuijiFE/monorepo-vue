// tslint:disable:no-any

import Vue, { PluginFunction } from 'vue';
import VoidUI, { VoidUIOptions } from 'void-ui';
import * as allComponents from './components/all';
export * from './components/all';
import * as fa from './font-awesome';

let $$Vue: typeof Vue;

/**
 * Common
 */
const common: PluginFunction<VoidUIOptions> = ($Vue, options = {}) => {
  if ($$Vue && $$Vue === $Vue) {
    return;
  }
  $$Vue = $Vue;

  $Vue.use<VoidUIOptions>(VoidUI, {
    defaultTheme: 'lite',
    ...options,
  });

  Object.entries(allComponents).forEach(([name, comp]) => Vue.component(name, comp));
  Object.entries(fa).forEach(([name, comp]) => Vue.component(name, comp as any));
};

export default common;

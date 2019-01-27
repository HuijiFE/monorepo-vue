import Vue, { PluginFunction } from 'vue';
import VoidUI, { VoidUIOptions } from 'void-ui';
import * as allComponents from './components/all';
export * from './components/all';

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
};

export default common;

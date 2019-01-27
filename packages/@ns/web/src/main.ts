import Vue from 'vue';
import Common from '@ns/common';
Vue.use(Common);

import App from './views/app';
import VueRouter from 'vue-router';
import { creatRouter } from './router';

Vue.config.productionTip = false;

/**
 * Factory function for vue app
 */
export function createApp(): { app: Vue; router: VueRouter } {
  const router = creatRouter();

  const app = new Vue({
    router,
    render: h => h(App),
  });

  return { app, router };
}

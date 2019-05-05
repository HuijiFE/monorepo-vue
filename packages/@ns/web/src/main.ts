import Vue from 'vue';
import Common from '@ns/common';

import VueRouter from 'vue-router';
import App from './views/app';
import { creatRouter } from './router';

Vue.use(Common);

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

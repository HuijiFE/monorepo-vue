/**
 * Main for web
 */

// tslint:disable:no-import-side-effect
import './main.scss';
import './registerServiceWorker';

import Vue from 'vue';
import Common from '@ns/common';
Vue.use(Common);

import App from './views/app';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

// tslint:disable:no-import-side-effect
import './main.scss';
import './registerServiceWorker';

/**
 * Entry Client
 */
import { createApp } from './main';

const { app, router } = createApp();

console.info('client side render');
app.$mount('#app');

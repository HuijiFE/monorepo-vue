/**
 * Entry Client
 */
import { createApp } from './main';

const { app, router } = createApp();

console.info('server side render');
app.$mount('#app');

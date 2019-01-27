import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/**
 * Factory function for vue router
 */
export function creatRouter(): VueRouter {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: async () => import(/* webpackChunkName: "v-home" */ './views/home'),
      },
    ],
  });
}

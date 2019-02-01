/**
 * Common
 * This is for running common standalone in static pages.
 */

// tslint:disable:no-import-side-effect no-reserved-keywords
import './main.scss';

import Vue from 'vue';
import Common, { NsHeader, NsFooter } from './index';
Vue.use(Common);

/**
 * Components mapping(tagName => component), uses for auto mount components standalone.
 */
const compsMap = {
  'ns-header': NsHeader,
  'ns-footer': NsFooter,
};

if (window !== undefined) {
  // Object.defineProperty(window, 'Vue2', {
  //   writable: false,
  //   get(): typeof Vue {
  //     return Vue;
  //   },
  // });

  Object.keys(compsMap).forEach(tagName => {
    const el = document.querySelector(tagName);
    if (el) {
      const comp = new Vue({ el });
    }
  });
}

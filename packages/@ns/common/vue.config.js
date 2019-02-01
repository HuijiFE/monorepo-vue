const Config = require('webpack-chain');
const { baseOptions, baseChainWebpack } = require('../../../vue/vue.config.base');
const { genPathResolve } = require('@huiji/shared-utils');

const resolvePath = genPathResolve(__dirname);

const options = {
  ...baseOptions(),
  publicPath: process.env.NODE_ENV === 'production' ? '//static.a9vg.com/common/' : '/',
  filenameHashing: false,

  /**
   * @param {Config} config
   */
  chainWebpack: config => {
    baseChainWebpack(config, options);

    config.optimization.delete('splitChunks').end();
  },

  devServer: {
    port: process.env.VUE_APP_PORT,
    open: true,
  },
};

module.exports = options;

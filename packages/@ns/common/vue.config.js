const Config = require('webpack-chain');
const env = require('../../../env');
const { baseOptions, baseChainWebpack } = require('../../../vue.config.base');
const { genPathResolve } = require('@huiji/shared-utils');
const { version } = require('./package.json');

const resolvePath = genPathResolve(__dirname);

const options = {
  ...baseOptions(),

  /**
   * @param {Config} config
   */
  chainWebpack: config => {
    baseChainWebpack(config, options);
  },

  devServer: {
    port: env().port,
    open: true,
  },
};

module.exports = options;

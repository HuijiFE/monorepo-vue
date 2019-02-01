const fs = require('fs');
const express = require('express');
const Config = require('webpack-chain');
const { chainWebpackHash, chainWebpackSSR } = require('@huiji/vue-cli-utils');
const { baseOptions, baseChainWebpack } = require('../../../vue/vue.config.base');
const { genPathResolve } = require('@huiji/shared-utils');
const { version } = require('./package.json');

const resolvePath = genPathResolve(__dirname);

const options = {
  ...baseOptions(),
  publicPath: process.env.NODE_ENV === 'production' ? '/static/' : '/',

  /**
   * @param {Config} config
   */
  chainWebpack: config => {
    config.resolve.alias.delete('@').set('@src', resolvePath('src'));

    baseChainWebpack(config, options);
    chainWebpackHash(options)(config);
    chainWebpackSSR(options)(config);

    fs.writeFileSync(
      '.tmp.webpack.config.js',
      `module.exports = ${Config.toString(config.toConfig())}`,
    );
  },

  devServer: {
    port: process.env.VUE_APP_PORT,
    open: true,

    /**
     *
     * @param {express.Application} app
     * @param {WebpackDevServer} server
     */
    before: (app, server) => {
      //
    },
  },
};

module.exports = options;

const fs = require('fs');
const express = require('express');
const Config = require('webpack-chain');
const { chainWebpackHash, chainWebpackSSR } = require('@huiji/vue-cli-utils');
const env = require('../../../vue/env');
const { baseOptions, baseChainWebpack } = require('../../../vue/vue.config.base');
const { genPathResolve } = require('@huiji/shared-utils');
const { version } = require('./package.json');

const resolvePath = genPathResolve(__dirname);

const options = {
  // ...baseOptions(),

  /**
   * @param {Config} config
   */
  chainWebpack: config => {
    // baseChainWebpack(config, options);

    config.resolve.alias.delete('@').set('@src', resolvePath('src'));

    chainWebpackHash(options)(config);
    chainWebpackSSR(options)(config);

    fs.writeFileSync(
      '.tmp.webpack.config.js',
      `module.exports = ${Config.toString(config.toConfig())}`,
    );
  },

  devServer: {
    port: env().port,
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

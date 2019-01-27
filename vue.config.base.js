const Config = require('webpack-chain');
const env = require('./env');
const cdnList = require('./pwa.cdn');

const baseOptions = pwaAssetsVersion => {
  const { isProd, side, project, port } = env();

  const publicPath = side === 'client' && !isProd ? '/' : '/static/';
  if (isProd || side === 'server') {
    const basePath = require('url').parse(publicPath).path;
    if (!basePath || basePath === '/') {
      throw new Error(`invalid publicPath: '${publicPath}'`);
    }
  }

  return {
    publicPath,
    outputDir: 'dist',
    filenameHashing: true,

    runtimeCompiler: true,

    pwa: {
      assetsVersion: pwaAssetsVersion,
      workboxOptions: {
        importWorkboxFrom: 'local',
        cacheId: 'a9vg',
        runtimeCaching: [
          {
            urlPattern: '/',
            handler: 'networkFirst',
          },
          {
            urlPattern: '/static/*',
            handler: 'cacheFirst',
          },
          ...cdnList.map(urlPattern => ({
            urlPattern,
            handler: 'staleWhileRevalidate',
            options: {
              cacheableResponse: {
                statuses: [0, 206],
              },
            },
          })),
          {
            urlPattern: '/*',
            handler: 'networkFirst',
          },
        ],
      },
    },

    parallel: false,
  };
};

/**
 * @param {Config} config
 */
const baseChainWebpack = (config, options) => {
  const { isProd, isLegacyBundle } = env();

  const hashDigest = 'hex';
  const hashDigestLength = 128;
  const hashFunction = 'sha512';
  const inlineLimit = 32;

  const getAssetPath = require('@vue/cli-service/lib/util/getAssetPath');

  config.resolve.alias.delete('@');

  // pwa --------------------------------------------------------

  if (isProd) {
    config.plugin('workbox').tap(([opt]) => {
      opt.exclude.push(/\.html$/);

      return [opt];
    });
  }

  // html --------------------------------------------------------

  config.plugin('html').tap(([opt]) => [
    {
      ...opt,
      minify: false,
    },
  ]);

  // js --------------------------------------------------------

  if (isProd) {
    const filename = getAssetPath(
      options,
      `js/[name]${isLegacyBundle ? '-legacy' : ''}${
        options.filenameHashing ? '.[contenthash]' : ''
      }.js`,
    );

    config.output
      .filename(filename)
      .chunkFilename(filename)
      .hashDigest(hashDigest)
      .hashDigestLength(hashDigestLength)
      .hashFunction(hashFunction);
  }

  // css

  if (isProd) {
    const filename = getAssetPath(
      options,
      `css/[name]${options.filenameHashing ? '.[contenthash]' : ''}.css`,
    );

    config.plugin('extract-css').tap(([opt]) => [
      {
        ...opt,
        filename: filename,
        chunkFilename: filename,
        hashDigest,
        hashDigestLength,
        hashFunction,
      },
    ]);
  }

  // assets --------------------------------------------------------

  const genFileLoaderOptions = dir => ({
    name: getAssetPath(
      options,
      `${dir}/[name]${
        options.filenameHashing
          ? `.[${hashFunction}:hash:${hashDigest}:${hashDigestLength}]`
          : ''
      }.[ext]`,
    ),
  });

  [['images', 'img'], ['media', 'media'], ['fonts', 'fonts']].forEach(([rule, dir]) => {
    config.module
      .rule(rule)
      .use('url-loader')
      .loader('url-loader')
      .tap(opt => ({
        ...opt,
        ...{
          limit: inlineLimit,
          fallback: {
            loader: 'file-loader',
            options: genFileLoaderOptions(dir),
          },
        },
      }));
  });

  config.module
    .rule('svg')
    .use('file-loader')
    .loader('file-loader')
    .tap(opt => ({
      ...opt,
      ...genFileLoaderOptions('img'),
    }));

  // extra modules --------------------------------------------------------

  config.module
    .rule('graphql')
    .test(/.(gql|graphql)$/)
    .use('raw-loader')
    .loader('raw-loader');
};

module.exports = {
  baseOptions,
  baseChainWebpack,
};

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, '../code/theme.less'), 'utf8')
);

const cssLoader = {
  loader: 'css-loader',
  options: { importLoaders: 1, include: /flexboxgrid/ }
};

const webpackCSSLoader = [
  { loader: 'style-loader' },
  process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : null,
  cssLoader,
  {
    loader: 'less-loader', // antd overrides
    options: {
      modifyVars: themeVariables,
      javascriptEnabled: true
    }
  }
].filter(Boolean);

module.exports = {
  module: {
    rules: [
      { parser: { amd: false } },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, '../code'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: path.resolve(__dirname, './webpack_cache/')
        }
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
      { test: /\.(css|pcss|less)$/, use: webpackCSSLoader },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=30000'
      },
      {
        test: /\.(gif|jpg|png|svg)$/,
        use:
          process.env.NODE_ENV === 'production'
            ? [
                'file-loader',
                {
                  loader: 'image-webpack-loader',
                  options: {
                    mozjpeg: {
                      progressive: true,
                      quality: 65
                    },
                    pngquant: {
                      quality: '65-90',
                      speed: 4
                    },
                    svgo: {
                      plugins: [
                        { removeUnknownsAndDefaults: true },
                        { cleanupIDs: false },
                        { removeViewBox: false },
                        { removeComments: true },
                        { removeTitle: true },
                        { removeDescription: true }
                      ]
                    }
                  }
                }
              ]
            : [{ loader: 'url-loader?limit=30000' }]
      },
      { test: /\.md$/, loader: 'html!markdown' }
    ]
  },
  resolve: {
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.css',
      '.pcss',
      '.scss',
      '.json',
      '.md',
      '.graphql',
      '.gql'
    ],
    alias: {
      views: path.join(__dirname, '../code/views'),
      utils: path.join(__dirname, '../code/utils'),
      gql: path.join(__dirname, '../code/graphql')
    },
    unsafeCache: true
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      __DEVELOPMENT__: process.env.NODE_ENV !== 'production'
    }),
    new webpack.ProvidePlugin({
      PropTypes: 'prop-types',
      React: 'react',
      ReactDOM: 'react-dom',
      classNames: 'classnames',
      Promise: 'bluebird'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/, /font-awesome/),
    new LodashModuleReplacementPlugin({
      paths: true,
      collections: true,
      cloning: true,
      caching: true,
      flattening: true,
      shorthands: true
    })
  ]
};

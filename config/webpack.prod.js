const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const packageJson = require('../package.json');

module.exports = merge(common, {
  mode: 'production',
  node: {
    fs: 'empty'
  },
  entry: {
    app: path.join(__dirname, '../code/index.js'),
    vendor: Object.keys(packageJson.dependencies)
  },
  output: {
    path: path.join(__dirname, '../public'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js?[chunkhash]'
  },
  stats: {
    children: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    colors: false,
    warnings: false
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        parallel: false,
        sourceMap: true,
        uglifyOptions: {
          output: {
            ascii_only: true
          },
          compress: {
            inline: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          enforce: true,
          priority: -10,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      test: /\.jsx?$/
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
});

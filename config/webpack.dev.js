const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    app: path.join(__dirname, '../code/index.js')
  },
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: '[name].js',
    publicPath: 'http://localhost:5000/'
  },
  devtool: 'eval-source-map',
  watchOptions: {
    poll: 1500,
    ignored: [/node_modules/, /libs/]
  },
  optimization: {
    namedModules: true
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    public: 'http://localhost',
    port: 5000,
    contentBase: path.join(__dirname, '../public'),
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  plugins: [new webpack.HotModuleReplacementPlugin({})]
});

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

const PUBLIC = path.resolve(__dirname, './public');
const CLIENT = path.resolve(__dirname, './src/client');

module.exports = merge(common, {
  entry: [
    'webpack-hot-middleware/client',
    path.join(CLIENT, 'index.js'),
  ],
  output: {
    path: '/',
    publicPath: '/',
    filename: 'app.bundle.js',
  },
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});

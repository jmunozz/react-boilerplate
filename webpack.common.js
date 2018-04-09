const path = require('path');

const CLIENT = path.resolve(__dirname, './src/client');
const PUBLIC = path.resolve(__dirname, './public');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '/assets/img/',
            outputPath: '/assets/img/',
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '/assets/fonts/',
            outputPath: '/assets/fonts/',
          }
        }]
      }
    ]
  },
};

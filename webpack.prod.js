const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = require('./webpack.common');

const CLIENT = path.resolve(__dirname, './src/client');
const PUBLIC = path.resolve(__dirname, './public');

module.exports = merge(common, {
    entry: {
        app: path.join(CLIENT, 'index.js'),
    },
    output: {
        path: PUBLIC,
        filename: '[name].bundle.js',
        publicPath: '/public',
    },
    mode:'production',
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
                })
        }]
    },
    plugins: [
        new ExtractTextPlugin("css/styles.css"),
    ],
});
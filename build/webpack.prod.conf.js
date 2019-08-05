var merge = require('webpack-merge');
var path = require('path');
var baseConfig = require('./webpack.base.conf');
var webpack = require('webpack');
// 清除打包多余文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 分离css,打包到单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
      publicPath: './'
    },
    module:{
      rules: [
        {
          test: /\.(c|le)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader'
          ]
        }
      ]
    },
    plugins: [    
      new CleanWebpackPlugin(),
      new OptimizeCSSAssetsPlugin(),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "css/[id].css"
      }),
      new webpack.DefinePlugin({
        'process.env': require('../config/prod.env')
      }), // 配置请求地址
    ]
  })
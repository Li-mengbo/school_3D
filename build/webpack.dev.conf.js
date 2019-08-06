var path = require('path');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');
var webpack = require('webpack');
module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    compress: true,
    port: 8888,
    host: '192.168.12.36'
  },
  module:{
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 开启热更新
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }), // 配置请求地址
  ]
})
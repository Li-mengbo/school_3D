var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var AutodllWebpackpackPlugin = require('autodll-webpack-plugin');
var config = {
    entry: {
        index: path.resolve(__dirname, '../src/js/index.js'),
        periphery:path.resolve(__dirname, '../src/js/periphery.js'),
        panorama: path.resolve(__dirname, '../src/js/panorama.js'),
        panoramaContainer: path.resolve(__dirname, '../src/js/panoramaContainer.js'),
        school: path.resolve(__dirname, '../src/js/school.js'),
        photo: path.resolve(__dirname, '../src/js/photo.js'),
        route: path.resolve(__dirname, '../src/js/route.js'),
        roam: path.resolve(__dirname, '../src/js/roam.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    module: {
        rules: [
           {
            test: /\.js$/,
            include: path.resolve(__dirname + '/src'),
            use: [
              'babel-loader'
            ],  
            exclude: /node_modules/
           },
           {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
              {
                loader: "file-loader",
                options: {
                  name: "[name].[ext]",
                  publicPath: "./static/",
                  outputPath: "static/"
                }
              }
            ]
          }            
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
          filename: "index.html",
          title: "index",
          template: path.resolve(__dirname, '../src/index.html'),
          chunks: ['index']
        }),
        new htmlWebpackPlugin({
          filename: "periphery.html",
          title: "periphery",
          template: path.resolve(__dirname, '../src/periphery.html'),
          chunks: ['periphery']
        }),
        new htmlWebpackPlugin({
          filename: "panorama.html",
          title: "panorama",
          template: path.resolve(__dirname, '../src/panorama.html'),
          chunks: ['panorama']
        }), 
        new htmlWebpackPlugin({
          filename: "panoramaContainer.html",
          title: "panoramaContainer",
          template: path.resolve(__dirname, '../src/panoramaContainer.html'),
          chunks: ['panoramaContainer']
        }),  
        new htmlWebpackPlugin({
          filename: "school.html",
          title: "school",
          template: path.resolve(__dirname, '../src/school.html'),
          chunks: ['school']
        }), 
        new htmlWebpackPlugin({
          filename: "photo.html",
          title: "photo",
          template: path.resolve(__dirname, '../src/photo.html'),
          chunks: ['photo']
        }),
        new htmlWebpackPlugin({
          filename: "route.html",
          title: "route",
          template: path.resolve(__dirname, '../src/route.html'),
          chunks: ['route']
        }),
        new htmlWebpackPlugin({
          filename: "roam.html",
          title: "roam",
          template: path.resolve(__dirname, '../src/roam.html'),
          chunks: ['roam']
        }),                 
        new AutodllWebpackpackPlugin({
          inject: true,
          debugger: true,
          filename: '[name].js',
          path: './dll',
          entry: {
            vendor: ['jquery']
          }
        }), // 单独打包第三方库
        new webpack.optimize.SplitChunksPlugin() //提取公共代码
      ],
      resolve: {
        extensions: ['.js', '.css', '.less']// 省去后缀
      }
}
module.exports = config;
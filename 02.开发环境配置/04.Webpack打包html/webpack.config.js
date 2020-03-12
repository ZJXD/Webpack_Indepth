/**
 * loader：1、下载    2、使用（配置）
 * plugins：1、下载   2、引入   3、使用
 */

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // loader 配置
    ],
  },
  plugins: [
    // plugins 配置
    // html-webpack-plugin
    // 功能：自动创建一个空的 HTML 文件，并自动引入打包后的资源（js/css）
    // 需要：我们自己写的 HTML 结构打包进来
    new HtmlWebpackPlugin({
      // 作用：用指定的 HTML 作为模板，创建 HTML 文件，并自动引入打包后的资源（js/css）
      template: './src/index.html',
    }),
  ],
  mode: 'development',
}

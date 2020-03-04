const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 单入口文件
  // entry: './src/js/index.js',
  // 多入口文件
  entry: {
    index: './src/js/index.js',
    test: './src/js/test.js',
  },
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  /**
   * 1、可以将 node_modules 中的代码单独打包一个 chunk 输出
   * 2、自动分析多入口 chunk 中有没有公共的文件，有的话只会打包一次
   */
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: 'production',
}

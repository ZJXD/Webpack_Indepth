const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // 告诉 webpack 在打包的时候哪些包不用打包，并且使用的名字也要变（这里就是加载生成的 manifest.json 文件）
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json'),
    }),
    // 将某个文件打包输出，并在 HTML 中自动引入资源
    new AddAssetHtmlPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js'),
    }),
  ],
  mode: 'production',
}

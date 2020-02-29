const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 用这个插件提取的 css 文件用的是 link 标签，这样不好出现闪屏，并且把 css 从 js 文件中分离出来，js 文件减少了
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 在 HTML 中创建 style 标签，并把 js 文件中的样式插入
          // 'style-loader',
          // MiniCssExtractPlugin.loader 用于代替上面的 style-loader，把 css 文件单独提取出来
          MiniCssExtractPlugin.loader,
          // 将 css 整合到 js 文件中
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // 提取 css 文件 plugin
    new MiniCssExtractPlugin({
      // 重命名输出文件名
      filename: 'css/built.css',
    }),
  ],
  mode: 'development',
}

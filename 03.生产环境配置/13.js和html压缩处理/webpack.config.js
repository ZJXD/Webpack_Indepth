const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  // 这里不需要 loader
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩HTML文件
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
  ],
  // 模式设置为 production 会自动压缩 js 文件
  mode: 'production',
}

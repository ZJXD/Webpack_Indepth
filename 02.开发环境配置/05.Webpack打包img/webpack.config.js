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
      {
        test: /\.less$/,
        // 多个 loader 用 use
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(jpg|png|gif)$/,
        // 使用一个 loader 用 loader
        // url-loader 需要下载：url-loader、file-loader
        loader: 'url-loader',
        options: {
          // 图片大小小于 8kb，会把图片转为base64处理
          // 优点：减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（请求会变慢）
          limit: 8 * 1024,
          // 问题：url-loader 默认采用的是 ES6 模块化语法，html-loader 采用的是 commonJS 语法
          // url-loader 解析 html-loader 会出现：[object Module]
          // 解决：关闭 url-loader ES6 模块化，使用 commonJS
          esModule: false,
          // 给文件重命名
          // [hash:10] 取文件 hash 值的前10位
          // [ext] 文件扩展名
          name: '[hash:10].[ext]',
        },
      },
      {
        test: /\.html$/,
        // 处理 HTML 文件的 img 图片（负责引入 img，从而能被 url-loader 处理）
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
}

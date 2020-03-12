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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // 打包其他资源（除 js/css/html 以为的资源）
      {
        // 排除一些资源 exclude
        exclude: /\.(css|js|html)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',

  // 开发服务器 devServer：用来自动化（自动编译、自动打开浏览器、自动刷新浏览器~~）
  // 特点：只会在内存中编译打包，不会输出任何东西
  // 启动 devServer 指令：npx webpack-dev-server（所以要下载 webpack-dev-server）
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    // 启动 gzip 压缩
    compress: true,
    // 端口号
    port: 9000,
    // 用于自动打开浏览器
    open: true,
  },
}

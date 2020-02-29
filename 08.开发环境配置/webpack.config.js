/**
 * 开发环境配置：
 *  启动命令：
 *    webpack：打包输出
 *    npx webpack-dev-server：开发运行
 */

const { resolve } = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    // loader 详细配置
    rules: [
      {
        // less-loader
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        // css-loader
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        // 不需要输出路径，是因为样式是打包在 js 文件里的
      },
      {
        // 图片 loader
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          // 关闭 es 模块化，使用 commonJS 模块化（为了 HTML 中的图片）
          esModule: false,
          // 该类资源输出的路径，相对 output 这里的路径
          outputPath: 'img',
        },
      },
      {
        // html 图片资源 loader
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        // 其他资源 loader
        exclude: /\.(html|js|css|less|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          // 该类资源输出的路径，相对 output 这里的路径
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    // plugin 详细配置
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 9001,
    open: true,
  },
}

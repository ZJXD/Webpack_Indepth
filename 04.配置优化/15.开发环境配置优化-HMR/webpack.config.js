/**
 * HMR：hot module replacement 热模块替换/模块热 替换
 *    作用：当某一个模块改变时，只去构建这一个模块（而不是重新构建全部）
 *        极大的提升构建速度
 *        1、样式文件可以使用 HMR 功能，因为 style-loader 中实现了
 *        2、js 文件不能使用 HMR 功能，还是全部构建
 *          注意：要使用 HMR 功能，只能对非入口文件，因为对入口文件做的话，入口文件里面引入的文件就会引发全部构建
 *        3、html 文件不能使用 HMR 功能，并且连热更新功能也不能使用
 *          解决：entry 文件中加入 html 文件，这样也是全部构建（由于现在一般都是单页系统，html 要实现 HMR ，那么一定会全部构建）
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
    // 开启 HMR 功能
    // 当修改了 webpack.config 的配置，需要重新启动 webpack-dev-server 服务
    hot: true,
  },
}

const { resolve } = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
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
    hot: true,
  },
  // 简单的 source-map 启动，生成 .map 结尾的文件
  devtool: 'eval-source-map',
}

/**
 * source-map：一种 源代码到构建后代码映射关系 技术（如果构建后代码出错，通过这个映射关系可以跟踪到源代码）
 *
 *    语法：[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
 *
 *    source-map：外部
 *      错误代码准确信息 和 源代码的错误位置
 *    inline-source-map：内联
 *      只生成一个内联 source-map
 *      错误代码准确信息 和 源代码的错误位置
 *    hidden-source-map：外部
 *      错误代码原因 没有错误位置
 *      不能追踪到源代码 只能追踪到构建后的
 *    eval-source-map：内联
 *      每一个文件生成一个 source-map，在 eval 中
 *      错误代码准确信息 和 源代码的错误位置
 *    nosources-source-map：外部
 *      错误信息，没有任何源代码信息
 *    cheap-source-map：外部
 *      错误代码准确信息 和 源代码的错误位置
 *    cheap-module-source-map：外部
 *      错误代码准确信息 和 源代码的错误位置
 *      module 会将 loader 的 source-map 加入
 *
 *    上面这些还两两再连接
 *
 *    内联和外部：1、内联没有文件，外部有文件；2、内联构建更快
 *
 *    开发环境：速度快，调试更友好
 *      速度（eval>inline>cheap...）
 *        eval-cheap-source-map
 *        eval-source-map
 *      调试更友好：
 *        source-map
 *        cheap-module-source-map
 *        cheap-source-map
 *    --> eval-source-map / eval-cheap-module-source-map
 *
 *    生成环境：
 *      内联会让代码体积很大，不会使用内联
 *      nosources-source-map
 *      hidden-source-map
 *
 *    --> source-map / cheap-module-source-map
 */

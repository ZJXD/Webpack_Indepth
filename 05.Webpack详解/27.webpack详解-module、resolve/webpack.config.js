const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './js/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // 多个 loader 应用同一个文件
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js/,
        // 排除 node_modules 下的 js 文件
        exclude: /node_modules/,
        // 只检查 src 文件下的 js
        include: resolve(__dirname, 'src'),
        // 执行顺序：pre 优先执行，post 延后执行，没有中间执行
        enforce: 'pre',
        // 一个 loader
        loader: 'eslint-loader',
        // 配置项
        options: {},
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  mode: 'production',
  // 解析模块的规则
  resolve: {
    // 配置解析模块路径别名：优点-> 简写路径，缺点-> 路径写的时候没有提示
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    // 配置省略的文件后缀名（在有些导入不需要写后缀名的）
    extensions: ['.js', '.vue', '.json'],
    // 告诉 webpack 解析模块到那个目录下找
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules'],
  },
}

/**
 * webpack.config.js WebPack 的配置文件
 *    作用：指示 WebPack 干哪些活（当你运行 WebPack 指令时，会加载这里的配置）
 *
 * 现有的所有构建工具都是基于 nodejs 平台，所以默认模块化采用的是 commonJS
 */

// resolve nodejs 中拼接绝对路径的方法
const { resolve } = require('path')

// webpack 配置
module.exports = {
  // 入口文件
  entry: './src/index.js',
  // 输出
  output: {
    // 输出文件名
    filename: 'built.js',
    // 路径；__dirname nodejs 中的变量，表示当前文件的绝对路径
    path: resolve(__dirname, 'build'),
  },
  // loader 配置
  module: {
    rules: [
      // loader 详细配置
      // 每一种文件必须写一个单独的 loader 配置
      {
        // test 匹配哪些文件（以结尾后缀匹配），使用的正则表达式
        test: /\.css$/,
        // 要使用的 loader 模块
        use: [
          // use 数组中 loader 的执行顺序是从右到左，从下到上的
          // 创建 style 标签，把 js 文件中的样式资源添加进去，再添加到 head 中生效（下面 css-loader 完成的结果）
          'style-loader',
          // 用于,将 css 编译成 commonJS 模块并加载到 js 文件中，里面内容是样式字符串
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 用于将 less 文件编译为 css，需要下载 less-loader 和 less
          'less-loader',
        ],
      },
    ],
  },
  // plugins 配置
  plugins: [
    // plugins 详细配置
  ],
  mode: 'development',
  // mode: 'production'
}

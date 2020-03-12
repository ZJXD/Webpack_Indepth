const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * entry：入口文件
 *    1、string：'./js/index.js'
 *      单入口
 *      打包形成一个 chunk ，输出一个 bundle 文件
 *      此时，chunk 默认的名称是 main
 *    2、array：['./js/index.js', './js/add.js']
 *      多入口
 *      所有入口文件最终只会形成一个 chunk，输出一个 bundle
 *      --> 只有在 HMR 功能中让 HTML 热更新生效
 *    3、object：
 *      多入口
 *      有几个入口文件就形成几个 chunk，输出几个bundle
 *      文件名是 key
 *
 *      特殊用法：
          {
            index: ['./js/index.js', './js/count.js'],
            add: './js/add.js',
          },
 */

module.exports = {
  entry: {
    index: ['./js/index.js', './js/count.js'],
  },
  output: {
    // 输出的文件名（目录+指定名称）
    filename: 'js/[name].js',
    // 输出的文件目录（所有资源输出的公共目录）
    path: resolve(__dirname, 'build'),
    // 所有资源引入的公共路径前缀：'imgs/a.jpg' --> '/imgs/a.jpg' (会有这样的改变)
    publicPath: '/',
    // 非入口 chunk 文件名
    chunkFilename: 'js/[name]_chunk.js',
    // 整个库向外暴露的变量名
    library: '[name]',
    // 变量名添加到哪个环境下，或者对象下
    libraryTarget: 'window', // browser
    // libraryTarget: 'global', // node
    // libraryTarget: 'commonjs', // commonjs
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development',
}

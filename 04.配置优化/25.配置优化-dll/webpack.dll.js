/**
 * dll 技术：对某些库进行单独打包（如第三方库：react、jquery、vue 等）
 *    当运行 webpack 时，默认的配置文件是 webpack.config.js
 *    问题：在运行 webpack.dll.js 时需要指定
 *      --> webpack --config webpack.dll.js
 */

const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    // jquery 是打包生成的文件名（下面输出的时候用）
    // ['jquery'] 是要打包的包的集合，可以多个打包成一个（切记包名，写成 jQuery 时一直没有排除打包）
    jquery: ['jquery'],
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    // 打包生成的库里面对外暴露的名称（包内部是：exports = [name]_[hash]）
    library: '[name]_[hash]',
  },
  plugins: [
    // 生成一个文件 manifest.json ：用于映射对外暴露名称和原库的对应关系
    new webpack.DllPlugin({
      // context: resolve(__dirname, '../'),
      // 映射打包后对外暴露的名称
      name: '[name]_[hash]',
      // 输出映射关系的文件
      path: resolve(__dirname, 'dll/manifest.json'),
    }),
  ],
  mode: 'production',
}

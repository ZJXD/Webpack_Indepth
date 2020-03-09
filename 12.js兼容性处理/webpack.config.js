const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      /**
       * JS 兼容性处理：babel-loader @babel/core @babel/preset-env
       *  1、基本 js 兼容问题：使用 @babel/preser-env
       *    问题：只能转换基本语法，如 promise 等高级语法不能转换
       *  2、全部 js 兼容处理：使用 @babel/polyfill
       *    使用：直接在入口文件引入
       *    问题：只需要解决部分兼容性问题，但是将所有的兼容性代码都导入了，体积太大
       *  3、按需 js 兼容处理：使用 corejs 安装 npm i core-js -D
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示 babel 做怎么样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载配置
                useBuiltIns: 'usage',
                // 指定 core-js 版本
                corejs: {
                  version: 3
                },
                // 指定兼容性做到哪些浏览器版本
                targets: {
                  chrome: '60',
                  firefox: '40',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: ['./js/index.js', './js/count.js'],
  },
  output: {
    // 输出的文件名（目录+指定名称）
    filename: 'js/[name].js',
    // 输出的文件目录（所有资源输出的公共目录）
    path: resolve(__dirname, 'build'),
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development',
  devServer: {
    // 开发环境下，运行代码的目录
    contentBase: resolve(__dirname, 'build'),
    // 监听 contentBase 下的文件，一旦有变化就会 reload
    watchContentBase: true,
    // 监听配置
    watchOptions: {
      // 监听忽略的文件
      ignored: /node_modules/,
    },
    // 开启 gzip 压缩
    compress: true,
    // 端口号
    port: 8000,
    // 服务器域名
    host: 'localhost',
    // 开启 HMR 功能
    hot: true,
    // 不显示启动服务器日志信息
    clientLogLevel: 'none',
    // 除了一些基本启动信息以外，其他内容都不显示
    quiet: true,
    // 出现错误时，不全屏显示
    overlay: false,
    // 服务器代理 --> 解决开发环境跨域问题
    proxy: {
      // 在开发环境下，接收到 '/api/xxx' 的请求，就会转发到指定的其他服务器
      '/api': {
        target: 'http://localhost:3000',
        // 发送请求时，请求路径重写：'/api/xxx' --> '/xxx'
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}

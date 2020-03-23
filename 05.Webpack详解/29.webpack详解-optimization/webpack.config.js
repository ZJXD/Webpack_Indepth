const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: './js/index.js',
  output: {
    // 输出的文件名（目录+指定名称）
    filename: 'js/[name]_[contenthash:10].js',
    // 输出的文件目录（所有资源输出的公共目录）
    path: resolve(__dirname, 'build'),
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'production',
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
  // 只有在生产环境才有效
  optimization: {
    splitChunks: {
      chunks: 'all', // 全部都分割
      // 下面的这些都是默认的配置，可以不写
      // minSize: 30 * 1024, // 分割chunk的最小30K（超过30k才分割）
      // maxSize: 0, // 最大不限制
      // minChunks: 1, // 要提取的 chunk 最少被引用1次
      // maxAsyncRequests: 5, // 按需加载时，并行加载的文件最大数量
      // maxInitialRequests: 3, // 入口 js 文件最大并行请求数量
      // automaticNameDelimiter: '~', // 名称连接符
      // name: true, // 可以使用命名规则
      // cacheGroups: {
      //   // 分割 chunk 的组
      //   vendors: {
      //     // node_modules 会被打包到 vendors 组中的 chunk --> vendors-xxx.js
      //     // 满足上面的公共规则，如至少引用一次
      //     test: /[\\/]node_modules[\/]/,
      //     // 优先级
      //     priority: -10,
      //   },
      //   // 默认的 chunk 分组
      //   default: {
      //     minChunks: 2, // 最少被引用两次
      //     priority: -20, // 优先级
      //     // 如果当前要打包的模块和之前已经打包的是同一个模块，就会复用，不再打包
      //     reuseExistingChunk: true,
      //   },
      // },
    },
    // 将当前模块引用其他模块的 hash 单独打包为一个 runtime
    //  解决：在使用缓存的时候，a 修改了，但是 index 没有修改，代码分割的时候 index 也会重新打包
    //        这样使用 runtime 不会
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`,
    },
    minimizer: [
      // 配置成产环境的压缩方案：js 和 css
      new TerserPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 开启 source-map
        sourceMap: true,
      }),
    ],
  },
}

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 用这个插件提取的 css 文件用的是 link 标签，这样不好出现闪屏，并且把 css 从 js 文件中分离出来，js 文件减少了
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 设置 node 环境变量
// process.env.NODE_ENV = 'development'

// optimize-css-assets-webpack-plugin 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',

          /**
           * css 兼容性处理：postcss --> postcss-loader postcss-preset-env
           *
           * postcss-preset-env：帮助 postcss 找到 package.json 中的 browserslist 的配置，通过配置加载指定的 css 兼容性样式
           * 
           * browserslist 可以在 github 上面查找具体的更全配置
           * 下面的两个默认的是使用 production 环境的
           * 去指定这个环境的配置是 node 的环境变量：process.env.NODE_ENV = 'development'
           *   "browserslist": {
                  "development": [
                    "last 1 chrome version",
                    "last 1 firefox version",
                    "last 1 safari version"
                  ],
                  "production": [
                    ">0.2%",
                    "not dead",
                    "not op_mini all"
                  ]
                }
           */
          // 使用 loader 默认配置
          // 'postcss-loader',
          // 修改 loader 配置
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss 的 plugins
                require('postcss-preset-env')()
                // pstorem  的配置
                // require('postcss-pxtorem')({
                //   rootValue:16, // 默认根元素的 font-size 的值，用于计算
                //   propList: [*] // 所有属性都转
                // })
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // 提取 css 文件 plugin
    new MiniCssExtractPlugin({
      // 重命名输出文件名
      filename: 'css/built.css',
    }),
    // 压缩 css
    new OptimizeCssAssetsPlugin(),
  ],
  mode: 'development',
}

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// css 单独提取文件处理 plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// css 压缩 plugin
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    // css 兼容性处理，需要在 package.json 文件中配置 browserslist 配置
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [require('postcss-preset-env')],
    },
  },
]

const { GenerateSW } = require('workbox-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        oneOf: [
          // 先是 css类别的,注意 css 单独输出和兼容性处理
          {
            test: /\.css$/,
            use: [...commonCssLoader],
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, 'less-loader'],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              /**
               * 开启多进程打包：需要安装 thread-loader
               *    进程开启需要600ms，进程间的通信也需要开销
               *    只有工作消耗时间较长，用多进程打包才有效果
               *
               * 下面是两种写法：默认的进程数是 CPU 核数-1
               */
              'thread-loader',
              // {
              //   loader: 'thread-loader',
              //   options: {
              //     workers: 2,
              //   },
              // },
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns: 'usage',
                        corejs: {
                          version: 3,
                        },
                        targets: {
                          chrome: '60',
                          firefox: '50',
                        },
                      },
                    ],
                  ],
                  // 当文件较多时，但是修改的文件只是其中一个，这样只去重新构建修改的，这样效率更高
                  // 开启 bebal 缓存，在第二次构建时，会读取之前的缓存
                  cacheDirectory: true,
                },
              },
            ],
          },
          // img 处理
          {
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'imgs',
              esModule: false,
            },
          },
          {
            test: /\.html$/,
            loader: 'html-loader',
          },
          // 其他文件
          {
            exclude: /\.(js|css|html|json|less|jpg|png|gif)$/,
            loader: 'file-loader',
            options: {
              outputPath: 'media',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built[contenthash:10].css',
    }),
    new OptimizeCssAssetsPlugin(),
    new GenerateSW({
      /**
       * 1、帮助 servicework 快速启动
       * 2、删除旧的 servicework
       *
       * 生成一个 servicework 配置文件
       */
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  mode: 'production',
  devtool: 'source-map',
}

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

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      /**
       * 正常来说，一个文件被一个 loader 处理，当一个文件被多个文件处理时，一定要确定好先后执行顺序
       *  这里对 js 来说：eslint 优先于 babel（需要先语法检查，如果先 babel ，这样转到es5语法，在eslint会报错）
       */
      // js 语法检查，由于本地以及配置了，所有这里就不需要了
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   // 优先执行
      //   enforce: 'pre',
      //   loader: 'eslint-loader',
      //   options: {
      //     fix: true,
      //   },
      // },
      {
        // 一般情况下，每一个文件只会被下面的一种匹配处理，如果都写在 rules 里面，每一个文件都会对比处理下，效率不高
        // oneOf  的作用是当被某一个 loader 匹配处理后就跳出，不再向下
        // 注意：上面导致的问题是，如果一个文件需要两个 loader 处理就有问题（下面处理 js 的提出来一个，上面eslint-loader提出来）
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
            },
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
      filename: 'css/built.css',
    }),
    new OptimizeCssAssetsPlugin(),
  ],
  mode: 'production',
}

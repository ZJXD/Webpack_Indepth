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

/**
 * 缓存：
 *    bebal 缓存：
 *      cacheDirectory: true,
 *      --> 让第二次打包构建更快
 *    文件资源缓存：在 js、css 输出文件名加上 [[chunk|content]hash:10]
 *      hash：每次构建都会生成一个唯一的 hash 值
 *        问题：这样 js、css 所有打包的文件hash值一样，重新打包缓存失效（如果只修改一个文件，全部缓存都失效）
 *      chunkhash：每次构建，同一个 chunk 的 hash 值唯一（chunk：同一个入口文件，通过引用关系关联一起，称为一个 chunk）
 *        问题：对于现在的单页应用，js、css chunkhash 还是一样
 *      contenthash：根据文件内容生成的 hash 值，同一个文件内容一样 contenthash 一样，内容不一样 contenthash 不一样
 *      --> 在上线后，当没有改变时，利用本地缓存。这样更快
 */

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
  ],
  mode: 'production',
  devtool: 'source-map',
}

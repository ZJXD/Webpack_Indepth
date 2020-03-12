const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        /**
         * ESLint 语法检查：eslint-loader eslint
         *  注意：只检查自己写的源代码，不检查第三方库的js代码
         *  设置检查规则：
         *    package.json 中的 eslint.Config 中设置
         *        "eslintConfig": {
                    "extends": "airbnb-base"
                  }
         *    airbnb --> eslint-config-airbnb-base --> esling-plugin-import eslint
         */
        test: /\.js$/,
        exclude: 'node_modules',
        loader: 'eslint-loader',
        options: {},
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
}

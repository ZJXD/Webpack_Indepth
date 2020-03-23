// 下载 npm i webpack@next webpack-cli -D

// 默认的 entry: './src/index.js'
//        output: { path: resolve(__dirname,'dist'),filename:'[name].js' }

// 一个强大的改变：对于 tree sharking ，多级对象，没有用到的属性不会打包

module.exports = {
  mode: 'production',
}

import print from './print.js'
// 引入样式资源
import '../css/iconfont.css'
import '../css/index.less'

console.log('index.js 被加载了！！')

print()

function add(x, y) {
  return x + y
}

console.log(add(3, 8))

if (module.hot) {
  // 当 hot 为 true，说明启用了 HMR 功能，让 HMR 功能生效
  // 要对其他 js 文件使用 HMR 功能，都这样进行监听（这样就太多了~~）
  module.hot.accept('./print.js', function() {
    // 该方法会监听 print.js 的变化，当检测到 print.js 有改变，其他模块不会重新打包构建
    // 就会进入这里，在这里执行 print.js 中的方法
    print()
  })
}

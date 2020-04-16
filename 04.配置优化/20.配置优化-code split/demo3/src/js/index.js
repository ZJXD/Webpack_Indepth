/**
 * 单入口文件下，通过 js 代码，单独将某一个文件打包成 chunk
 * import 动态导入语法：能将某个文件单独打包
 *
 * 在 import 中加注释，可以根据注释给定打包文件名前缀
 */
import(/* webpackChunkName: 'test' */ './test.js')
  .then(({ mul, count }) => {
    // 文件加载成功
    console.log(mul(3, 5))
  })
  .catch(() => {
    console.log('文件加载失败！')
  })

function GetCFB() {
  const N = 9
  let cfb = []
  for (let i = 1; i <= N; i++) {
    let str = []
    for (let j = 1; j <= i; j++) {
      str.push(`${j} * ${i} = ${i * j}`)
    }
    cfb.push(str.join('    '))
  }
  document.getElementById('cfbTxt').innerText = cfb.join('\n')
}

GetCFB()

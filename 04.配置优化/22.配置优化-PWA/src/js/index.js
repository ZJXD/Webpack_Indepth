import { mul } from './test.js'
import '../css/index.css'

console.log(mul(3, 4))

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

/**
 * 问题：
 * 1、eslint 不认识 window 等，需要配置 package.json 中的 eslintConfig
 *    "env":{
 *      "browser":true
 *    }
 * 2、sw 代码必须运行在服务器上面
 *  --> node.js
 *  --> npm i serve -g
 *      serve -s build  启动服务器，将 build 下的资源作为静态资源暴露出去
 */
// 注册 servicework
// 处理兼容性（简单来，有就用，没有不用）
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(() => {
        console.log('sw 注册成功！')
      })
      .catch(() => {
        console.log('sw 注册失败！')
      })
  })
}

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

function GetCFB() {
  const N = 9
  let cfb = []
  for (let i = 1; i <= 9; i++) {
    let str = []
    for (let j = 1; j <= i; j++) {
      str.push(`${i} * ${j} = ${i * j}`)
    }
    cfb.push(str.join('    '))
  }
  document.getElementById('cfbTxt').innerText = cfb.join('\n')
}

GetCFB()

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
console.log('index.js 文件以及加载！')

document.getElementById('lazy').onclick = function() {
  /**
   * 懒加载：当文件需要时才加载
   */
  import(/* webpackChunkName: 'test' */ './test').then(({ mul }) => {
    console.log(mul(4, 5))
  })
}

document.getElementById('pre').onclick = function() {
  /**
   * 预加载 prefetch：在注释中配置（兼容性差）
   *    会在使用前，已经加载（这个加载是异步的，当其他资源加载完后，浏览器会偷偷加载）
   *  正常加载：相当于同步并行加载（同一时间加载多个文件）
   */
  import(
    /* webpackChunkName: 'prefetch', webpackPrefetch:true */ './prefetch.js'
  ).then(({ count }) => {
    console.log(count(3, 5))
  })
}

// 引入 js 全部兼容模块
// import '@babel/polyfill'

const add = (x, y) => {
  return x + y
}

console.log(add(2, 5))

const prom = new Promise(resolve => {
  setTimeout(() => {
    console.log('定时器工作了~~')
    resolve()
  }, 1000)
})
console.log(prom)

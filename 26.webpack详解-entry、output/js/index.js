// import add from './add'
// import count from './count'

// console.log('相加：', add(3, 4))
// console.log('相减：', count(5, 2))

import('./add').then(({ default: add }) => {
  console.log('相加：', add(2, 3))
})

console.log('index.js文件加载了！')

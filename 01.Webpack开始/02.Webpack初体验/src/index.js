/**
 * index.js： webpack 入口起点文件
 * 一.运行指令(没有配置文件的情况下)：
 *  1、开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
 *    WebPack 会以 ./src/index.js 为入口文件起点，打包后输出到 ./build/built.js 文件
 *    整体打包环境是：development（开发环境）
 *  2、生产环境：webpack ./src/index.js -o ./build/built.pro.js --mode=production
 *    WebPack 会以 ./src/index.js 为入口文件起点，打包后输出到 ./build/built.pro.js 文件
 *    整体打包环境是：production（生产环境）
 * 二、结论
 *  1、WebPack 能处理 js/json资源，不能处理 css/img 等资源；
 *  2、生产环境和开发环境都会将 ES6 模块化编译成浏览器识别的模块化~
 *  3、生产环境比开发环境打包后多了压缩 js 代码的功能；
 */

// import './index.css' // 有本行代码，打包报错
import data from './data.json'
console.log(data)

function add(x, y) {
  return x + y
}
console.log(add(4, 5))

# Webpack_Indepth

### 项目说明

作为 WebPack 由浅入深的练习项目  
出自 【尙硅谷】 的视频

### 环境

Node：12.13.0  
NPM：6.12.0  
其他包资源在根目录包管理文件中

### 项目结构

1、根据每一个阶段不同建的不同项目  
2、在根目录下初始化了包管理文件，方便各个子文件中共同使用

### 文件夹说明

1、01.Webpack 简介：初步认识，为什么需要 Webpack  
2、02.Webpack 初体验：Webpack 本身能处理的文件（不使用配置文件、loader 等）  
3、03.Webpack 打包样式资源：通过配置 webpack.config.js 文件以及 loader 能处理样式文件（css 和 less）  
4、04.Webpack 打包 html ：通过配置 webpack.config.js 文件中的 plugins 能处理 html 文件  
5、05.Webpack 打包 img：通过配置 webpack.config.js 文件的 loader 能处理图片文件  
6、06.Webpack 打包其他资源：通过配置 webpack.config.js loader 打包其他资源  
7、07.devServer：开发服务器，自动编译、自动打开浏览器、自动刷新浏览器等  
8、08.开发环境配置：集合前面的所有，并对文件结构优化、调整  
9、09.提取 css 到单独文件：把打包在 js 中的 css 单独打包  
10、10.css 兼容性处理和压缩  
11、11.js 语法检测 eslint（由于我本地用的和讲的不一致，就没有做）  
12、12.js 兼容性处理（基本兼容性、全部兼容性、按需）  
13、13.js 和 html 压缩（设置较简单）  
14、14.生产环境配置  
15、15.开发环境配置优化-HMR（热模块替换，在开发的时候能让构建更快）  
16、16.配置优化-source-map（便于调试）  
17、17.配置优化-oneOf（loader 处理文件优化）  
18、18.配置优化-缓存（构建缓存、上线缓存）  
19、19.配置优化-tree shaking（摇树，去除 无用代码）  
20、20.配置优化-code split（代码分割，把文件打包都不同 chunk）  
21、21.配置优化-lazy loading 和 prefetch（懒加载和预加载）  
22、22.配置优化-PWA（离线加载技术）  
23、23.配置优化-多进程打包  
24、24.配置优化-externals（使用 CDN 时，不用打包的包）  
25、25.配置优化-dll（第三方库单独打包，不用每次都再打包）

const path = require('path')
const webpack = require('webpack')

function getVersion () {
  let d = new Date()
  return '' + d.getFullYear() + d.getMonth() + 1 + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds()
}


const isPro = process.env.NODE_ENV === 'production'
console.log(process.env.NODE_ENV+'123')

const projectName = path.resolve(__dirname).split(path.sep).pop()
const entryPath = './src/main.js'

module.exports = {
    publicPath: `/`, // 根路径 cli3.0以上使用publicPath替代baseUrl,解决build后找不到静态资源的问题
    assetsDir: 'assets', // 静态资源目录(js,css,img,fonts)这些文件都可以写里面
    outputDir: 'dist', // 打包的时候生成的一个文件夹名
    lintOnSave: false, // 是否开启eslint保存检测 ,它的有效值为 true || false || 'error'
    pwa: {
      name: 'okzfans-shop',
      themeColor: '#4DBA87',
      msTileColor: '#000000',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black',
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        importScripts: ['https://g.alicdn.com/kg/workbox/3.6.3/workbox-sw.js'],
        exclude: [/\.html$/],//html不进行service Worker缓存
        // 自定义 Service Worker 文件的位置
        swSrc: 'src/pwa/service-worker.js'
      }
    },
    // 服务器请求相关的配置
    devServer: {
        overlay: {
            // 让浏览器 overlay 同时显示警告和错误
            warnings: true,
            errors: true,
        },
        host: 'localhost',
        port: 9527, // 端口号
        https: false, // https:{type:Boolean}
        open: false, // 配置后自动启动浏览器
        hotOnly: true, // 热更新
        // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
        proxy: {
            // 配置多个代理
            '/api1': {
                target: 'http://127.0.0.1:8077',
                changeOrigin: true,
                ws: true, // websocket支持
                secure: false,
                pathRewrite: {
                    '^/api1': '/',
                },
            },
            '/elseIp': {
                target: 'http://197.0.0.2:8088',
                changeOrigin: true,
                // ws: true, // websocket支持
                secure: false,
                pathRewrite: {
                    '^/elseIp': '/',
                },
            },
        },
    },
    chainWebpack: config => {
      if (isPro) {
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
      }
    },
    configureWebpack: config => {
      config.entry.app[0] = entryPath
      console.log(process.env.NODE_ENV)
      if (isPro) {
        config.output.filename = 'js/[name].[hash].js'
        config.output.chunkFilename = 'js/[name].[hash].js'
      }
      config.plugins.push(
        new webpack.DefinePlugin({
          __SW_VERSION__: getVersion(),
          __PROJECT_NAME__: JSON.stringify(projectName)
        })
      )
    }
}

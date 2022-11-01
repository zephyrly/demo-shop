import Vue from 'vue'

const requireComponent = require.context( // webpack的api，一个函数方法，匹配文件
  './', // 查看当前目录下的文件(查找需要文件的相对路径)
  true, // 查看子文件
  /index.(vue|js)$/ // 匹配方式正则表达式，只查看后缀为.vue的文件
)
// 循环获取到的文件，可在循环时处理文件名
requireComponent.keys().forEach((fileName) => {

  // 获取组件配置(组件模板)
  const componentConfig = requireComponent(fileName).default

  if (/.vue$/.test(fileName)) {
    // 将组件在循环中注册到全局，
    Vue.component(componentName, componentConfig) // 依据文件名处理好的，将要被注册到全局的组件名
  } else {
    Vue.use(componentConfig)
  }
})

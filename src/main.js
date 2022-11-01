import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './plugins/element.js'
import '@/assets/fonts/iconfont.css'
import './assets/css/global.css'
import '@/mock'
import _ from 'lodash'
import axios from 'axios'
import '@/style/global.css' // 在main.js中引入公共样式



// 引入 [res,err] async处理报错使用try catch方式，await-to-js处理async await使我们能使用[err]进行报错处理
import to from 'await-to-js';
Vue.prototype.$to = to


// 配置富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

// 配置axios到原型链中
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios
Vue.prototype._ = _

// 阻止生产环境产生的消息提示
Vue.config.productionTip = false

// 全局使用过滤器  goods/goodsList下有局部使用
// Vue.filter('dateFormat', function (originVal) {
//   const dt = new Date(originVal)

//   const y = dt.getFullYear()
//   const m = (dt.getMonth() + 1 + '').padStart(2, '0')
//   const d = (dt.getDate() + '').padStart(2, '0')

//   const hh = (dt.getHours() + '').padStart(2, '0')
//   const mm = (dt.getMinutes() + '').padStart(2, '0')
//   const ss = (dt.getSeconds() + '').padStart(2, '0')

//   return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome'
import Login from '../views/login.vue'
import Table from '@/views/components/users/table'
import Roles from '@/views/components/power/roles'
import Rights from '@/views/components/power/rights'
import Demo from '@/views/components/demo/demo'
import Goods from '@/views/components/goods/goodsList'
import Add from '@/views/components/goods/addGoods'
import cate from '@/views/components/goods/cate'
import params from '@/views/components/goods/params'
import Order from '@/views/components/order/order'
import report from '@/views/components/report/report'
import virtualList from '@/components/virtualList'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Table },
      { path: '/roles', component: Roles },
      { path: '/rights', component: Rights },
      { path: '/demo', component: Demo },
      { path: '/goods', component: Goods },
      { path: '/goods/add', component: Add },
      { path: '/orders', component: Order },
      { path: '/categories', component: cate },
      { path: '/params', component: params },
      { path: '/reports', component: report },
      { path: '/virtualList', component: virtualList }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  { path: '/', redirect: '/login' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')

  // 使用NProgress，进行跳转的进度条设置
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})


export default router

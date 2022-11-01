import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // 进度条插件
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth'
import { filterAsyncRoutes } from '@/utils/asyncRouter.js'

NProgress.configure({ showSpinner: false }) // 进度条配置

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // 进度条开始
  NProgress.start()
  // 获取路由 meta 中的title，并设置给页面标题
  document.title = to.meta.title
  // 获取用户登录的token
  const hasToken = getToken()
  // 判断当前用户是否登录
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 从store中获取用户角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户角色
          const roles = await store.state.roles
          // 通过用户角色，获取到角色路由表
          const accessRoutes = filterAsyncRoutes(await store.state.routers, roles)
          // 动态添加路由到router内
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          // 清除用户登录信息后，回跳到登录页去
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 用户未登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 需要跳转的路由是否是whiteList中的路由，若是，则直接条状
      next()
    } else {
      // 需要跳转的路由不是whiteList中的路由，直接跳转到登录页
      next(`/login?redirect=${to.path}`)
      // 结束进度条
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 结束进度条
  NProgress.done()
})

/*
 普通权限路由示例
*/
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)
// 权限路由列表
let asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true,
    name: 'Permission',
    meta: {
      title: 'Permission',
      roles: ['admin', 'editor']  // 普通用户角色
    },
    children: [
      {
        path: 'path',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page',
          roles: ['editor']  //  editor角色的用户才能访问该页面
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role',
          roles: ['admin']    //  admin角色的用户才能访问该页面
        }
      }
    ]
  }
]

// 静态路由

let defaultRouter = [{
  path: '/404',
  name: '404',
  component: () => import('@/views/404'),
  meta: {
    title: '404'
  }
}]
let router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: defaultRouter
})
export default router

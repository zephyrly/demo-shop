import http from '../utils/http'
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
const resquest = ''

// 请求登录
export function getLogin (params) {
  return http.post(`${resquest}` + 'login', params)
}

// 菜单栏列表
export function getMenus (params) {
  return http.get(`${resquest}` + 'menus', params)
}

export function getList (params) {
  return http.post('/api/ratings/list', params)
}

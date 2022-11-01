/* eslint-disable */
// import http from '../utils/http'
// /**
//  *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
//  *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
//  */
// const resquest = ''

// // 角色列表
// export function getRolesList (params) {
//   return http.get(`${resquest}` + 'roles', params)
// }
// //
// export function deleteRights (params) {
//   return http.get(`${resquest}` + `roles/${params.id}/rights/${params}`, params)
// }

import request from '@/http/index.js' // axios的封装 后续添加axios二次封装

//  /cosmopaas-dev为跨域规则 前面文章有提到
// post方式传参用data
export function getRolesList (query) {
  return request({
    url: 'roles',
    method: 'get',
    data: query
  })
}

// 添加角色
export function addRoles (query) {
  return request({
    url: 'roles',
    method: 'post',
    data: query
  })
}

// 删除角色指定权限
export function removeTag (roleId, rightId) {
  return request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}

// 查询
export function getCommonList (query) {
  return request({
    url: '/cosmopaas-dev/algorithm/getAlgorithmModelPage',
    method: 'post',
    data: query
  })
}

// 删除角色
export function deleteRoles (id) {
  return request({
    url: `roles/${id}`,
    method: 'delete'
  })
}

// 编辑角色
export function editRoles (id, data) {
  return request({
    url: `roles/${id}`,
    method: 'put',
    data: data
  })
}

// 获取权限
export function getRights (type) {
  return request({
    url: `rights/${type}`,
    method: 'get'
  })
}

// 分配权限
export function grantRight (roleId, data) {
  return request({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: data
  })
}
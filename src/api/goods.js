/* eslint-disable */
// params ==> 字符串拼接，data ===> json格式转换
import request from '@/http/index.js'

// 查询
export function getGoodsList (data) {
  return request({
    url: 'goods',
    method: 'get',
    params: data
  })
}

// 删除商品
export function deleteGoods (id) {
  return request({
    url: `goods/${id}`,
    method: 'delete'
  })
}

// 获取商品分类数据列表
export function getCategories (query) {
  return request({
    url: 'categories',
    method: 'get',
    data: query
  })
}

// 获取动态参数或者静态属性
export function getAttri (id, query) {
  return request({
    url: `categories/${id}/attributes`,
    method: 'get',
    params: query
  })
}

// 添加动态参数或者静态属性
export function AddAttri (id, query) {
  return request({
    url: `categories/${id}/attributes`,
    method: 'post',
    params: query
  })
}

// 添加商品
export function addGoods (query) {
  return request({
    url: `goods`,
    method: 'post',
    data: query
  })
}

// 查询
export function demo (query) {
  return request({
    url: 'goods',
    method: 'post',
    data: query
  })
}




// 商品参数params
// 获取商品参数
export function getParamsList (query) {
  return request({
    url: 'categories',
    method: 'get',
    data: query
  })
}

export function deleteParams (cateId, attr_id) {
  return request({
    url: `categories/${cateId}/attributes/${attr_id}`,
    method: 'delete'
  })
}

// 获取分类参数
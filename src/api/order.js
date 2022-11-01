// params ==> 字符串拼接，data ===> json格式转换
import request from '@/http/index.js' // axios的封装 后续添加axios二次封装

// 查询
export function getOrderList (data) {
  return request({
    url: 'orders',
    method: 'get',
    params: data
  })
}

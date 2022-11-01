# 配置项说明

```yaml
name: you
env: staging
project: you
host: you.xxx.com
source: ctf
scope: Admin
title: titleName
welcomeRedirect: '/chatkit/index'
COS:
  Bucket: xxx-xxx
  Region: xxx-xxx
  path: path
api:
  baseUrl: baseUrl
  identity: admin
  host: you.xxx.com
  basePath: api/xxx
version: 1.0.0
ico: null
timezone: +08:00
cosPath: /admin/
function: []
guiderIdentity: [{ label: 'xxx', value: 'xxx' }, { label: 'xxx', value: 'xxx' }]
authMenus: [[4503, 34, 4454, 4455, 4488, 29], [{ index: 5 }, { index: 5 }, { index: 5 }, { index: 5 }, { index: 4 }, { index: -99 }], []]
```

- name 项目名称
- env: 所属环境[env、staging、production]
- project: 项目（必须是唯一的）
- host: 域名
- source: 后台的 source
- scope: 所属行业{"全部页面":admin}
- title: 网页名称
- welcomeRedirect: 进入后自动跳转的路径，不配置则默认前往`/welcome`
- COS: COS 配置[Bucket、Region, path]
- api: api 信息
  - baseUrl: baseUrl
  - identity: admin
  - host: 后台接口地址，如果前端页面和接口地址不一样，此处必配
  - basePath: api/xxx
- version: 版本号
- ico: icon的URL
- timezone: 时区
- cosPath: 打包好的代码在cos的位置
- function: 特有的业务
- guiderIdentity: 导购的身份
- authMenus: 菜单排序，数组的第一个元素为需要排序的菜单ID，第二个元素为对应的配置等，index越大，排序越靠前，越小，排序越靠后`[[4503,34,4454,4455,4488,29], [{ index: 5 }, { index: 5 }, { index: 5 }, { index: 5 }, { index: 4 }, { index: -99 }], []`

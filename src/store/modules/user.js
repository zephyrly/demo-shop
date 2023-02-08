
// state 存放状态
// mutations state成员操作
// getters 加工state成员给外界
// actions 异步操作
// modules 模块化状态管理
// 登陆案例
import { getLogin } from '@/api/base'
const state = {
  // {{ $store.state.name }}
  username: '',
  password: '',
  UserInfo: {},
  Total: null,
  size: 2,
  query: null,
  page: 1,
  token: '',
  email: ''
}

const mutations = {
  // this.$store.commit('edit')
  // this.$store.commit('edit',{age:15,sex:'男'})
  //   this.$store.commit({
  //     type:'edit',
  //     payload:{
  //         age:15,
  //         sex:'男'
  //     }
  // })
  changeName (state) {
    state.username = 'jack'
  },
  GETUSERINFO (state, data) {
    state.UserInfo = data
    state.username = data.username
    state.email = data.email
    state.token = data.token
  }

}

const getters = {
  // this.$store.getters.fullInfo
  nameInfo (state) {
    return "姓名:" + state.username
  },
  fullInfo (state, getters) {
    return getters.nameInfo + '年龄:' + state.age
  },
  getUserInfo: state => {
    return state.UserInfo;
  },
  adf (state) {
    return "姓名:" + state.username
  },
}

const actions = {
  // this.$store.dispatch('aEdit',{age:15})
  aEdit (context, payload) {
    return new Promise((resolve, reject) => {
      let timer = setTimeout(() => {
        context.commit('changeName', payload)
        resolve()
      }, 2000)
    })
  },
  // this是Vue实例,此处context 可以将this
  getCurUserInfo (context, data1) {
    getLogin(data1).then((res) => {
      context.commit('GETUSERINFO', res.data.data)
      // console.log(res.data)
    }).catch((error) => {
      // console.log(error)
    }).finally(() => {
      // console.log('结果正确错误，都返回结果')
    })
  }
}

export default {
  namespaced: true,//使用命名空间，这样只在局部使用
  state,
  actions,
  getters,
  mutations
}

// 此处还可以调用actions封装方法 例：
export const aEdit = (res) => {
  if (res) {
    console.log(res)
  } else {
    return
  }
}
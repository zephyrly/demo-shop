import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import mutations from './mutations'
import state from './state'
import actions from './actions'
import user from './modules/user'
import home from './modules/home'

// state 存放状态
// mutations state成员操作
// getters 加工state成员给外界
// actions 异步操作
// modules 模块化状态管理

Vue.use(Vuex)

let store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,

  // 模块化
  modules: {
    user,
    home
  }
})

export default store
const state = {
    keepAliveComponents: [], // 缓存数组
}
const mutations = {
    keepAlive(state, component) {
        // 注：防止重复添加（当然也可以使用Set）
        !state.keepAliveComponents.includes(component) &&
            state.keepAliveComponents.push(component)
    },
    noKeepAlive(state, component) {
        const index = state.keepAliveComponents.indexOf(component)
        index !== -1 && state.keepAliveComponents.splice(index, 1)
    },
}

const getters = {
  // this.$store.getters.fullInfo
  adf (state) {
    return "姓名:" + state.username
  },
  adc (state, getters) {
    return getters.nameInfo + '年龄:' + state.age
  },
  abc: state => {
    return state.UserInfo;
  }
}

export default {
    namespaced: true, //使用命名空间，这样只在局部使用
    state,
    mutations,
}

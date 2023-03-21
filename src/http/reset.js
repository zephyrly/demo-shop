/* eslint-disable */
import service from './index.js'

export default {
  post (url, data, config) {
    return service.post(url, data, config)
  },

  get (url, params, config) {
    const getConfig = {}
    if (params) {
      Object.assign(getConfig, {
        params
      })
    }
    if (config) Object.assign(getConfig, config)

    return service.get(url, getConfig)
  },

  put (url, data, config) {
    return service.put(url, data, config)
  },

  delete (url, params, config) {
    const delConfig = {}
    if (params) {
      Object.assign(delConfig, {
        params
      })
    }
    if (config) Object.assign(delConfig, config)

    return service.delete(url, delConfig)
  }
}
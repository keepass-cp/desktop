export default {
  namespaced: true,
  state: {
    locale: navigator.language
  },
  mutations: {
    set (state, data) {
      Object.keys(data).forEach(key => {
        state[key] = data[key]
      })
    }
  },
  actions: {
    setLocale ({ commit }, locale) {
      if (!locale) return Promise.resolve()
      commit('set', { locale })
      return window.storage.set({ settings: { locale } }, 'sync')
    }
  }
}

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import settings from './modules/settings'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations,
  actions,
  modules: {
    settings
  }
})

if (module.hot) {
  // accept actions and mutations as hot modules
  module.hot.accept(['./mutations', './modules/settings'], () => {
    // require the updated modules
    // have to add .default here due to babel 6 module output
    const newMutations = require('./mutations').default
    const newSettings = require('./modules/settings').default
    // swap in the new actions and mutations
    store.hotUpdate({
      mutations: newMutations,
      modules: {
        settings: newSettings
      }
    })
  })
}

export default store

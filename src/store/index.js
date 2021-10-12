import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locale : "es"
  },
  getters: {
    getLocale: state => {
      return state.locale
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

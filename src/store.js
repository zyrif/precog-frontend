import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deferredId: -1,
    deferredStatus: 'ready',

    deferredVideoUrl: ''
  },
  mutations: {
    setDeferredId (state, payload) {
      state.deferredId = payload.id
    },

    setDeferredStatus (state, payload) {
      state.deferredStatus = payload.status
    }
  },
  actions: {

  }
})

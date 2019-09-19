import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deferredId: -1,
    deferredVideoUid: '',
    deferredStatus: 'ready',
    deferredAPIUrl: 'http://localhost:8000/api/video/'
  },
  mutations: {
    setDeferredId (state, payload) {
      state.deferredId = payload.id
    },

    setDeferredStatus (state, payload) {
      state.deferredStatus = payload.status
    },
    setDeferredVideoUid (state, payload) {
      state.deferredVideoUid = payload.deferredVideoUid
    }
  },
  actions: {

  }
})

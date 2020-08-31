import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authToken: '',
    isLoggedIn: false,

    videoId: -1,
    videoStatus: 'ready',
    baseAPIUrl: 'http://localhost:8000'
  },
  getters: {
    apiStatusUrl (state) {
      return state.baseAPIUrl + '/api/'
    },
    apiAuthTokenUrl (state) {
      return state.baseAPIUrl + '/api/auth-token/'
    },
    videoAPIUrl (state) {
      return state.baseAPIUrl + '/api/video/'
    }
  },
  mutations: {
    setAuthToken (state, payload) {
      state.authToken = payload.token
    },
    setLoginState (state, payload) {
      state.isLoggedIn = payload.state
    },

    setVideoId (state, payload) {
      state.videoId = payload.id
    },

    setVideoStatus (state, payload) {
      state.videoStatus = payload.status
    }
  },
  actions: {
    //
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Deferred from './views/Deferred.vue'
import Realtime from './views/Realtime.vue'
import Settings from './views/Settings.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/deferred',
      name: 'deferred',
      component: Deferred
    },
    {
      path: '/realtime',
      name: 'realtime',
      component: Realtime
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})

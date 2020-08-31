<template>
  <nav>
    <v-app-bar
      app
      flat
      short
    >
      <v-app-bar-nav-icon
        class="grey--text"
        v-on:click="toggleDrawer"
      />
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">P</span>
        <span>Recog</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        text
        color="grey"
        v-on:click="doSignOut"
      >
        <span>Sign Out</span>
        <v-icon right>
          mdi-exit-to-app
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      dark
      temporary
      class="blue"
    >
      <v-list nav>
        <v-list-item
          v-for="item in drawerItems"
          v-bind:key="item.title"
          v-ripple
          router
          v-bind:to="item.route"
          active-class="white--text"
        >
          <v-list-item-icon>
            <v-icon dark>
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    data () {
      return {
        drawer: false,
        drawerItems: [
          { icon: 'mdi-view-dashboard-outline', title: 'Dashboard', route: '/' },
          { icon: 'mdi-content-save-outline', title: 'Deferred', route: '/deferred' },
          { icon: 'mdi-monitor', title: 'Realtime', route: '/realtime' },
          { icon: 'mdi-settings-outline', title: 'Settings', route: '/settings' }
        ]
      }
    },
    methods: {
      toggleDrawer () {
        this.drawer = !this.drawer
      },

      doSignOut () {
        this.setAuthToken({ token: '' })
        this.setLoginState({ state: false })

        sessionStorage.clear()

        this.$router.go()
      },

      // map vuex mutations
      ...mapMutations([
        'setAuthToken',
        'setLoginState'
      ])
    }
  }
</script>

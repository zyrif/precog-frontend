<template>
  <v-app v-if="isLoggedIn">
    <nav-bar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
  <v-app v-else>
    <login-form />
  </v-app>
</template>

<script>
  import NavBar from '@/components/Navbar.vue'
  import LoginForm from '@/components/LoginForm.vue'

  import { mapState } from 'vuex'

  export default {
    name: 'App',
    components: {
      NavBar,
      LoginForm
    },
    data: () => ({
      //
    }),
    computed: {
      ...mapState([
        'authToken',
        'isLoggedIn'
      ])
    }
  }
</script>

<template>
  <v-container class="login-page">
    <v-row
      class="login-page-content"
    >
      <v-col
        class="login-page-description"
      >
        <p class="login-page-title">
          Welcome to PRECOG!
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam harum possimus quod quasi explicabo provident, debitis exercitationem, perspiciatis mollitia autem, molestiae sed ducimus rerum. Veritatis dolorem a, error dolore voluptatem ex ullam voluptatibus modi id! Dolor fugiat minima fugit error, mollitia maxime incidunt sit, ex quas explicabo, ab tempore expedita!</p>
        <v-btn
          bottom
          depressed
          color="rgba(255, 0, 0, .6)"
          dark
          href="#"
        >
          See more
        </v-btn>
      </v-col>

      <v-col
        class="login-page-login"
      >
        <v-card
          class="elevation-2"
        >
          <v-toolbar
            color="blue"
            dark
            flat
          >
            <v-toolbar-title>
              Log In
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="username"
                v-bind:rules="[rules.required]"
                label="Username"
                name="username"
                type="text"
                outlined
              />

              <v-text-field
                v-model="password"
                v-bind:rules="[rules.required]"
                label="Password"
                name="password"
                type="password"
                outlined
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              class="mb-2 white--text"
              outlined
              depressed
              block
              large
              color="blue"
              v-bind="btnOptions"
              v-on:click="processLogin"
            >
              Log In
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  import axios from 'axios'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    data () {
      return {
        username: null,
        password: null,

        btnIsLoading: false,
        btnError: false,
        btnErrorMsg: '',

        rules: {
          required: value => !!value || 'Value Required'
        }
      }
    },
    computed: {
      btnOptions () {
        const options = {
          loading: this.btnIsLoading

        }
        return options
      },

      // map vuex getters
      ...mapGetters([
        'apiAuthTokenUrl'
      ])
    },
    methods: {
      processLogin () {
        if (this.username && this.password) {
          this.btnIsLoading = true

          axios
            .post(this.apiAuthTokenUrl, {
              username: this.username,
              password: this.password
            })
            .then((response) => {
              if (response.status === 200) {
                this.btnIsLoading = false

                this.setAuthToken({ token: response.data.token })
                this.setLoginState({ state: true })
                // console.log(this.$store.state.isLoggedIn)

                this.$router.replace('/')
              }
            })
            .catch((response) => {
              //
            })
        } else {
          //
        }
      },

      // map vuex Mutations
      ...mapMutations([
        'setAuthToken',
        'setLoginState'
      ])
    }
  }
</script>

<style>
  .login-page-title {
    font-size: 3em;
    font-weight: 700;
  }
  .login-page-login {
    max-width: 370px;
    min-width: 370px;
  }
  .login-page-content {
    max-width: 1200px;
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 10%;
  }
  .login-page {
    background-color: #f2f2f2;
    height: 100vh;
  }

</style>

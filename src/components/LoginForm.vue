<template>
  <v-container
    fluid
    fill-height
  >
    <v-row
      align="center"
      justify="center"
      class="mx-12"
    >
      <v-col
        offset-md="1"
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
        align="center"
      >
        <v-card
          class="elevation-2"
          min-width="360px"
          max-width="460px"
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
                v-on:keydown="clickLoginBtn"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              ref="loginBtn"
              class="mb-2 white--text"
              depressed
              block
              large
              v-bind="btnOptions"
              v-on:click="processLogin"
            >
              {{ btnMessage }}
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

        btnEnabled: true,
        btnIsLoading: false,
        btnColor: 'blue',
        btnMessage: 'LOG IN',

        rules: {
          required: value => !!value || 'Value Required'
        }
      }
    },
    computed: {
      btnOptions () {
        const options = {
          loading: this.btnIsLoading,
          disabled: !this.btnEnabled,
          color: this.btnColor,
          outlined: this.btnColor === 'blue'
        }
        return options
      },

      // map vuex getters
      ...mapGetters([
        'authToken',
        'apiAuthTokenUrl',
        'apiStatusUrl'
      ])
    },
    methods: {
      // TODO: change name to executeLogin()
      processLogin () {
        // TODO: Remove this check, it is redundant
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
            .catch((error) => {
              if (!error.status && error.message === 'Network Error') {
                this.btnIsLoading = false
                this.btnColor = 'error'
                this.btnMessage = 'NETWORK OR API ERROR'

                setTimeout(() => {
                  this.btnColor = 'blue'
                  this.btnMessage = 'LOG IN'
                }, 5000)
              } else if (error.response.status === 400) {
                this.btnIsLoading = false
                this.btnColor = 'error'
                this.btnMessage = 'INVALID CREDENTIALS'

                setTimeout(() => {
                  this.btnColor = 'blue'
                  this.btnMessage = 'LOG IN'
                }, 2500)
              } else if (error.response.status > 400 && error.response.status <= 599) {
                this.btnIsLoading = false
                this.btnColor = 'error'
                this.btnMessage = 'API ERROR'

                setTimeout(() => {
                  this.btnColor = 'blue'
                  this.btnMessage = 'LOG IN'
                }, 10000)
              } else {
                this.btnIsLoading = false
                this.btnEnabled = false
                this.btnColor = 'error'
                this.btnMessage = 'ERROR'
                //
                console.info(error.message)
              }
            })
        } else {
          //
        }
      },
      clickLoginBtn (keyevent) {
        if (keyevent.key === 'Enter') {
          this.$refs.loginBtn.click()
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

</style>

<template>
  <v-container
    class="fill-height"
  >
    <v-row
      align="center"
      justify="end"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
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

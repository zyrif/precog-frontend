<template>
  <v-container
    class="fill-height"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card
          class="elevation-2 px-12 py-8"
        >
          <v-layout
            row
            justify-center
            align-center
          >
            <v-progress-circular
              v-bind:size="100"
              v-bind:width="7"
              indeterminate
              color="blue"
            />
          </v-layout>
          <p class="text-center display-1 mt-7 grey--text">
            {{ videoStatus | capitalize }}
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  /* eslint-disable no-console */
  import axios from 'axios'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },
    computed: {
      ...mapGetters([
        'videoDetailsUrl'
      ])
    },

    mounted () {
      const refreshStatus = setInterval(() => {
        axios
          .get(this.videoDetailsUrl, {
            headers: { 'Authorization': `token ${this.authToken}` }
          })
          .then(
            (response) => {
              if (response.status === 200) {
                this.setVideoStatus({ status: response.data.status })
              } else {
                console.error("Can't reach API")
                console.log(response)
                clearInterval(refreshStatus)
              }
            }
          )
          .catch(
            (error) => {
              console.error(error)
              clearInterval(refreshStatus)
            }
          )
      }, 2000)

      // // manually emulating success condition
      // // by setting status to completed
      // // this value will be set from the output of api
      // setTimeout(() => {
      //   this.setDeferredStatus({ status: 'completed' })
      // }, 5000)
    },
    methods: {
      ...mapMutations([
        'setVideoStatus'
      ])
    }
  }
</script>

<style scoped>
  .v-progress-circular {
    margin: 1rem;
  }
</style>

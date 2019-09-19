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
            {{ deferredStatus | capitalize }}
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  /* eslint-disable no-console */
  import axios from 'axios'
  import { mapState, mapMutations } from 'vuex'

  export default {
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },
    computed: {
      ...mapState([
        'deferredId',
        'deferredStatus',
        'deferredAPIUrl'
      ]),
      deferredJobUrl () {
        return this.deferredAPIUrl + this.deferredId
      }
    },

    mounted () {
      const refreshStatus = setInterval(() => {
        axios
          .get(this.deferredJobUrl)
          .then(
            (response) => {
              if (response.status === 200) {
                this.setDeferredStatus({ status: response.data.status })
                if (response.data.status === 'completed') {
                  this.setDeferredVideoUid({ deferredVideoUid: response.data.video_id })
                  clearInterval(refreshStatus)
                }
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
        'setDeferredStatus',
        'setDeferredVideoUid'
      ])
    }
  }
</script>

<style scoped>
  .v-progress-circular {
    margin: 1rem;
  }
</style>

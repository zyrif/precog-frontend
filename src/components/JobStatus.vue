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
            Processing
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'deferredStatus'
      ])
    },

    mounted () {
      // manually emulating success condition
      // by setting status to completed
      // this value will be set from the output of api
      setTimeout(() => {
        this.setDeferredStatus({ status: 'completed' })
      }, 5000)
    },

    methods: {
      ...mapMutations([
        'setDeferredStatus'
      ])
    }
  }
</script>

<style scoped>
  .v-progress-circular {
    margin: 1rem;
  }
</style>

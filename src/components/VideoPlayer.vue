<template>
  <v-container>
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        xs="12"
        sm="9"
        md="8"
        lg="6"
        xl="4"
      >
        <video
          width="100%"
          controls
          v-bind:src="deferredVideoUrl"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'deferredAPIUrl',
        'deferredVideoUid'
      ]),
      deferredVideoUrl () {
        return this.deferredAPIUrl + this.deferredVideoUid
      }
    }
  }
</script>

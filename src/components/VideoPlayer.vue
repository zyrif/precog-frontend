<template>
  <v-container>
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        xs="12"
        sm="10"
        md="10"
        lg="10"
        xl="9"
      >
        <video
          width="100%"
          controls
          v-bind:src="videoLink"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  export default {
    props: {
      videoLink: {
        type: String,
        default: ''
      }
    }
  }
</script>

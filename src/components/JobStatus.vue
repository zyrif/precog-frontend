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
  export default {
    //
  }
</script>

<style scoped>
  .v-progress-circular {
    margin: 1rem;
  }
</style>

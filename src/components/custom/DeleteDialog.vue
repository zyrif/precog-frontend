<template>
  <v-dialog
    v-model="dialog"
    persistent
    v-bind:width="options.width"
    v-bind:style="{ zIndex: options.zIndex }"
  >
    <v-card>
      <v-card-title class="headline">
        Are you sure?
      </v-card-title>
      <v-card-text>
        This action is unreversible. Deleting the job session will delete associated video files and data.
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          v-on:click="no()"
        >
          Cancel
        </v-btn>
        <v-btn
          color="red darken-1"
          text
          v-on:click="yes()"
        >
          Proceed
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'DeleteDialog',
    data () {
      return {
        dialog: false,
        options: {
          width: 290,
          zIndex: 200
        },
        resolve: null,
        reject: null
      }
    },
    methods: {
      open (options) {
        this.dialog = true
        this.options = Object.assign(this.options, options)
        return new Promise((resolve, reject) => {
          this.resolve = resolve
          this.reject = reject
        })
      },
      yes () {
        this.resolve(true)
        this.dialog = false
      },
      no () {
        this.resolve(false)
        this.dialog = false
      }
    }
  }
</script>

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
          class="elevation-2"
        >
          <v-toolbar
            color="blue"
            dark
            flat
          >
            <v-toolbar-title>
              Upload Pre-recorded Video
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-file-input
                v-model="video_file"
                class="mt-7"
                color="blue"
                show-size
                accept="video/*"
                label="Video File Input"
                placeholder="Select Video File"
                prepend-icon="mdi-movie-outline"
                outlined
                v-bind:display-size="1000"
              >
                <template v-slot:selection="{ text }">
                  <v-chip
                    color="blue"
                    dark
                    label
                    small
                  >
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              class="mb-2"
              dark
              depressed
              block
              large
              color="blue"
              v-on:click="processUpload"
            >
              Upload
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        video_file: null
      }
    },
    methods: {
      processUpload () {
        if (this.video_file == null) {
          console.debug('No File')
        } else {
          console.debug('Video size: ' + this.video_file.size)
        }
      }
    }
  }
</script>

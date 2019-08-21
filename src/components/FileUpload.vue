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
              Upload Pre-Recorded Video
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
                label="Select Video File"
                placeholder="Click Here to Select"
                prepend-icon="mdi-movie-outline"
                outlined
                v-bind="inputOptions"
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
              class="mb-2 white--text"
              depressed
              block
              large
              color="blue"
              v-bind="btnOptions"
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
        video_file: null,

        // File Input options
        inputIsLoading: false,
        inputIsSuccess: false,
        inputMessages: [],
        inputSuccessMessages: [],

        // Button options
        btnIsLoading: false,
        btnIsDisabled: false

      }
    },
    computed: {
      inputOptions () {
        const options = {
          loading: this.inputIsLoading,
          messages: this.inputMessages,
          success: this.inputIsSuccess,
          successMessages: this.inputSuccessMessages
        }
        return options
      },
      btnOptions () {
        const options = {
          loading: this.btnIsLoading,
          disabled: this.btnIsDisabled
        }
        return options
      }
    },
    methods: {
      processUpload () {
        if (this.video_file == null) {
          this.inputMessages = 'No File to Upload'

          setTimeout(() => {
            this.inputMessages = []
          }, 2000)
        } else {
          this.inputIsLoading = true
          this.btnIsDisabled = true

          setTimeout(() => {
            this.inputIsLoading = false
            this.btnIsDisabled = false

            // success condtion
            this.inputIsSuccess = true
            this.inputSuccessMessages = 'File Upload Succeeded!'

            setTimeout(() => {
              this.inputIsSuccess = false
              this.inputSuccessMessages = []
            }, 3000)
          }, 5000)
        }
      }
    }
  }
</script>

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
                class="mt-6"
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

  import axios from 'axios'
  import { mapState, mapGetters, mapMutations } from 'vuex'

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
      },

      // map vuex state
      ...mapState([
        'videoId',
        'videoStatus'
      ]),
      // map vues getters
      ...mapGetters([
        'authToken',
        'apiStatusUrl',
        'videoAPIUrl'
      ])
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

          let uploadFormData = new FormData()
          uploadFormData.append('video_file', this.video_file)

          axios
            .post(this.videoAPIUrl, uploadFormData, {
              headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': `token ${this.authToken}`
              }
            })
            .then(
              (response) => {
                this.inputIsLoading = false
                this.btnIsDisabled = false

                if (response.status === 201) {
                  this.inputIsSuccess = true
                  this.inputSuccessMessages = 'File Upload Succeeded!'

                  setTimeout(() => {
                    // eslint-disable-next-line
                    console.log('Job id: ' + response.data.id)  // temp
                    this.setVideoId({ id: response.data.id })
                    this.setVideoStatus({ status: response.data.status })
                  }, 1000)
                } else {
                  // eslint-disable-next-line
                  console.log(response)
                }
              }
            )
            .catch(
              // eslint-disable-next-line
              (error) => console.error(error)
            )

          // setTimeout(() => {
          //   this.inputIsLoading = false
          //   this.btnIsDisabled = false

          //   // success condtion
          //   this.inputIsSuccess = true
          //   this.inputSuccessMessages = 'File Upload Succeeded!'

          //   setTimeout(() => {
          //     this.inputIsSuccess = false
          //     this.inputSuccessMessages = []

          //     // manually set status to 'uploaded' for now
          //     // this will be set according to the api return later
          //     this.setVideoStatus({ status: 'uploaded' })
          //   }, 1000)
          // }, 5000)
        }
      },

      // map vuex mutations
      ...mapMutations([
        'setVideoId',
        'setVideoStatus'
      ])
    }
  }
</script>

<template>
  <v-card
    class="elevation-2"
  >
    <v-toolbar
      color="blue"
      dark
      flat
    >
      <v-toolbar-title>
        Upload Video File
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
          v-bind="fileInputOptions"
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
          <template v-slot:progress>
            <v-progress-linear
              absolute
              height="2"
              v-bind:indeterminate="fileUploadProgress <= 0"
              v-bind:value="fileUploadProgress"
            />
          </template>
        </v-file-input>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        v-if="!fileInputIsLoading"
        class="mb-2 white--text"
        depressed
        block
        large
        color="blue"
        v-bind="fileUploadBtnOptions"
        v-on:click="processUpload"
      >
        Upload
      </v-btn>
      <v-btn
        v-else
        class="mb-2 white--text"
        depressed
        block
        large
        color="warning"
        v-bind="fileUploadBtnOptions"
        v-on:click="cancelUpload"
      >
        Cancel Upload
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>

  import axios from 'axios'
  import { mapGetters } from 'vuex'

  const CancelToken = axios.CancelToken
  let axiosCancelPromise

  export default {
    name: 'FileUpload',
    data () {
      return {
        // * File Upload Options
        video_file: null,

        // File Input options
        fileInputIsLoading: false,
        fileInputIsSuccess: false,
        fileInputIsError: false,
        fileInputMessages: [],
        fileInputSuccessMessages: [],
        fileInputErrorMessages: [],

        // File Upload Btn options
        fileUploadBtnDisabled: false,

        // Progressbar Options
        fileUploadProgress: 0
      }
    },
    computed: {
      // * File Upload Properties
      fileInputOptions () {
        const options = {
          loading: this.fileInputIsLoading,
          messages: this.fileInputMessages,
          success: this.fileInputIsSuccess,
          successMessages: this.fileInputSuccessMessages,
          error: this.fileInputIsError,
          errorMessages: this.fileInputErrorMessages
        }
        return options
      },

      fileUploadBtnOptions () {
        const options = {
          disabled: this.fileUploadBtnDisabled
        }
        return options
      },

      // map vuex getters
      ...mapGetters([
        'authToken',
        'videoAPIUrl'
      ])
    },
    methods: {
      // * File Upload Methods

      processUpload () {
        if (this.video_file == null) {
          this.fileInputMessages = ['No File to Upload']

          setTimeout(() => {
            this.fileInputMessages = []
          }, 2000)
        } else {
          this.fileInputIsLoading = true

          let uploadFormData = new FormData()
          uploadFormData.append('video_file', this.video_file)

          axios
            .post(this.videoAPIUrl, uploadFormData, {
              headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': `token ${this.authToken}`
              },
              onUploadProgress: (progressEvent) => {
                this.fileUploadProgress = Math.ceil((progressEvent.loaded / progressEvent.total) * 100)
              },
              cancelToken: new CancelToken(function executor (c) {
                axiosCancelPromise = c
              })
            })
            .then(
              (response) => {
                if (response.status === 201) {
                  this.fileInputIsSuccess = true
                  this.fileInputSuccessMessages = ['File Upload Succeeded!']

                  setTimeout(() => {
                    this.$emit('toggleDialog')
                  }, 2500)
                } else {
                  this.fileInputIsError = true
                  this.fileInputErrorMessages = ['Upload Failed']
                  console.warn(response)
                }
              }
            )
            .catch(
              (error) => {
                if (axios.isCancel(error)) {
                  this.fileInputMessages = ['Upload Cancelled By User']
                } else {
                  this.fileInputIsError = true
                  this.fileInputErrorMessages = error.message
                }
              }
            )
            .finally(
              _ => {
                this.video_file = null
                this.fileUploadBtnDisabled = true
                this.fileInputIsLoading = false
                this.fileUploadProgress = 0

                setTimeout(() => {
                  this.fileUploadBtnDisabled = false
                  this.fileInputMessages = []
                  this.fileInputIsSuccess = false
                  this.fileInputSuccessMessages = []
                  this.fileInputIsError = false
                  this.fileInputErrorMessages = []
                }, 3000)
              }
            )
        }
      },
      cancelUpload () {
        axiosCancelPromise()
      }
    }
  }
</script>

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
        v-bind="fileUploadBtnOptions"
        v-on:click="processUpload"
      >
        Upload
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>

  import axios from 'axios'
  import { mapGetters } from 'vuex'

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

        // Button options
        fileUploadBtnIsLoading: false,
        fileUploadBtnIsDisabled: false
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
          loading: this.fileUploadBtnIsLoading,
          disabled: this.fileUploadBtnIsDisabled
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
          this.fileInputMessages = 'No File to Upload'

          setTimeout(() => {
            this.fileInputMessages = []
          }, 2000)
        } else {
          this.fileInputIsLoading = true
          this.fileUploadBtnIsDisabled = true

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
                this.fileInputIsLoading = false

                if (response.status === 201) {
                  this.fileInputIsSuccess = true
                  this.fileInputSuccessMessages = 'File Upload Succeeded!'

                  setTimeout(() => {
                    this.$emit('toggleDialog')
                    this.video_file = null
                    this.fileUploadBtnIsDisabled = false

                    this.fileInputIsSuccess = false
                    this.fileInputSuccessMessages = []
                    // console.log('Job id: ' + response.data.id)  // temp
                    // this.setVideoId({ id: response.data.id })
                    // this.setVideoStatus({ status: response.data.status })
                  }, 2000)
                } else {
                  this.fileInputIsError = true
                  this.fileInputErrorMessages = ['Upload Failed']
                  console.warn(response)

                  setTimeout(() => {
                    this.video_file = null
                    this.fileUploadBtnIsDisabled = false

                    this.fileInputIsError = false
                    this.fileInputErrorMessages = []
                  }, 3000)
                }
              }
            )
            .catch(
              (error) => {
                this.fileInputIsLoading = false
                this.fileInputIsError = true
                this.fileInputErrorMessages = error.message

                setTimeout(() => {
                  this.video_file = null
                  this.fileUploadBtnIsDisabled = false

                  this.fileInputIsError = false
                  this.fileInputErrorMessages = []
                }, 3000)
              }
            )
        }
      }
    }
  }
</script>

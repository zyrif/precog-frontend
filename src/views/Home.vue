<template>
  <div class="home">
    <v-container>
      <v-dialog
        v-model="uploadDialog"
        max-width="380"
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
      </v-dialog>
      <v-data-table
        :headers="tableHeaders"
        :items="tableRowItems"
        :item-key="tableRowItems.id"
        :loading="tableIsLoading"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
            flat
            color="white"
          >
            <v-toolbar-title>Dashboard</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            />
            <v-spacer />
            <v-btn
              class="white--text"
              color="blue"
              v-on:click.stop="uploadDialog = true"
            >
              UPLOAD
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.date="{item}">
          <span v-if="item.date"> {{ new Date(item.date).toLocaleString() }} </span>
          <span v-else> N/A </span>
        </template>

        <template v-slot:item.status="{item}">
          <span> {{ item.status | capitalize }} </span>
        </template>

        <template v-slot:no-data>
          <p class="display-1">
            No Data!
          </p>
        </template>

        <template v-slot:progress>
          <v-progress-linear
            :height="5"
            indeterminate
          />
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'

  export default {
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },
    data () {
      return {
        // * Data Table Options
        tableIsLoading: true,
        uploadDialog: false,
        tableRefreshJob: '',
        tableRowItems: [],

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
      // * Data Table Properties
      tableHeaders () {
        const values = [
          {
            text: 'Date',
            align: 'start',
            value: 'date'
          },
          {
            text: 'File Name',
            value: 'video_name'
          },
          {
            text: 'Length',
            value: 'video_length'
          },
          {
            text: 'Size',
            value: 'video_size'
          },
          {
            text: 'Frame Rate',
            value: 'video_framerate'
          },
          {
            text: 'Status',
            value: 'status'
          }
        ]

        return values
      },

      hasValues () {
        return this.tableRowItems.length > 0
      },

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
    mounted: function () {
      this.fetchTableData()
      this.tableRefreshJob = setInterval(() => {
        this.fetchTableData()
      }, 3000)
    },
    destroyed: function () {
      clearInterval(this.tableRefreshJob)
    },
    methods: {
      // * Data Table Methods
      fetchTableData () {
        axios
          .get(this.videoAPIUrl, {
            headers: { 'Authorization': `token ${this.authToken}` }
          })
          .then(
            (response) => {
              this.tableRowItems = response.data
              this.tableIsLoading = false
            }
          )
          .catch(
            (error) => {
              // TODO: Implement data table request error handling
              console.info(error)
            }
          )
      },

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
                    this.uploadDialog = false
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
                  console.info(response)

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

<template>
  <div class="home">
    <v-container>
      <v-dialog
        v-model="uploadDialog"
        max-width="380"
      >
        <file-upload
          v-on:closeDialog="closeUploadDialog()"
        />
      </v-dialog>
      <delete-dialog
        ref="refDeleteDialog"
      />
      <v-dialog
        v-model="videoPlayerDialog"
      >
        <v-card
          color="black"
        >
          <video-player v-bind:video-link="videoLink" />
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

        <template v-slot:item.actions="{item}">
          <v-container
            class="pa-0"
          >
            <v-row>
              <v-col
                class="px-1"
              >
                <v-btn
                  v-if="item.status === 'completed'"
                  depressed
                  fab
                  small
                  height="24"
                  width="24"
                  color="teal accent-3"
                >
                  <v-icon
                    small
                    class="mx-2"
                    color="white"
                    v-on:click="openPlayer(item)"
                  >
                    mdi-play
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col
                class="px-1"
              >
                <v-btn
                  depressed
                  fab
                  small
                  height="24"
                  width="24"
                  color="pink lighten-1"
                >
                  <v-icon
                    small
                    class="mx-2"
                    color="white"
                    v-on:click="deleteSession(item)"
                  >
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
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

  import DeleteDialog from '@/components/custom/DeleteDialog'
  import VideoPlayer from '@/components/VideoPlayer'
  import FileUpload from '@/components/FileUpload'

  export default {
    components: {
      DeleteDialog,
      VideoPlayer,
      FileUpload
    },
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
        sessionDeleteDialog: false,
        videoPlayerDialog: false,
        tableRefreshJob: '',
        tableRowItems: [],

        // * Video Player Values
        videoLink: ''
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
          },
          {
            text: 'Actions',
            value: 'actions',
            align: 'center',
            sortable: false,
            filterable: false,
            groupable: false
          }
        ]

        return values
      },

      hasValues () {
        return this.tableRowItems.length > 0
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

      deleteSession (item) {
        // this.sessionDeleteDialog = false
        this
          .$refs
          .refDeleteDialog
          .open()
          .then(result => {
            if (result) {
              if (item.id && item.id > 0) {
                console.info('Called deleteSession with item: ', item)
              } else {
                console.warn('Invalid id in deleteSession: ', item)
              }
            }
          })
      },

      openPlayer (item) {
        this.videoLink = this.videoAPIUrl + item.id.toString() + '/download'

        this.videoPlayerDialog = true
      },

      closeUploadDialog () {
        if (this.uploadDialog) this.uploadDialog = false
      }
    }
  }
</script>

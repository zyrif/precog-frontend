<template>
  <div class="home">
    <v-container>
      <v-dialog
        v-model="uploadDialog"
        max-width="380"
      >
        <file-upload
          v-on:toggleDialog="toggleUploadDialog"
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
      <session-table
        v-on:deleteSession="deleteSession"
        v-on:openPlayer="openPlayer"
        v-on:toggleDialog="toggleUploadDialog"
      />
      <v-snackbar
        v-model="snackbarVisible"
        v-bind:timeout="5000"
      >
        {{ snackbarText }}
        <template v-slot:action="{ attrs }">
          <v-btn
            v-bind:color="snackbarColor"
            text
            v-bind="attrs"
            v-on:click="snackbarVisible = false"
          >
            Dismiss
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import DeleteDialog from '@/components/custom/DeleteDialog'
  import VideoPlayer from '@/components/VideoPlayer'
  import FileUpload from '@/components/FileUpload'
  import SessionTable from '@/components/SessionTable'
  import Axios from 'axios'

  export default {
    components: {
      DeleteDialog,
      VideoPlayer,
      FileUpload,
      SessionTable
    },
    data () {
      return {
        uploadDialog: false,
        videoPlayerDialog: false,
        videoLink: '',

        // snackbar
        snackbarVisible: false,
        snackbarColor: 'primary',
        snackbarText: ''
      }
    },
    computed: {
      // map vuex getters
      ...mapGetters([
        'authToken',
        'videoAPIUrl'
      ])
    },
    methods: {
      openPlayer (item) {
        this.videoLink = this.videoAPIUrl + item.id.toString() + '/download'
        this.videoPlayerDialog = true
      },

      deleteSession (item) {
        this
          .$refs
          .refDeleteDialog
          .open()
          .then(result => {
            if (result) {
              if (item.id && item.id > 0) {
                Axios
                  .delete(`${this.videoAPIUrl}${item.id}/`, {
                    headers: { 'Authorization': `token ${this.authToken}` }
                  })
                  .then((response) => {
                    if (response.status === 200) {
                      this.snackbarText = 'Successfully Deleted'
                      this.snackbarColor = 'success'
                    } else {
                      this.snckbarText = `Error: ${response.data.error}`
                      this.snackbarColor = 'error'
                    }
                    this.snackbarVisible = true
                  })
                  .catch((error) => {
                    if (error.response) {
                      this.snackbarText = `Error: ${error.response.data.error}`
                    } else {
                      this.snackbarText = error.message
                    }
                    this.snackbarColor = 'error'
                    this.snackbarVisible = true
                  })
              } else {
                console.warn('Invalid id in deleteSession: ', item)
              }
            }
          })
      },

      toggleUploadDialog () {
        this.uploadDialog = !this.uploadDialog
      }
    }
  }
</script>

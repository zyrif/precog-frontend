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
    </v-container>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import DeleteDialog from '@/components/custom/DeleteDialog'
  import VideoPlayer from '@/components/VideoPlayer'
  import FileUpload from '@/components/FileUpload'
  import SessionTable from '@/components/SessionTable'

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
        videoLink: ''
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
                console.info('Called deleteSession with item: ', item)
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

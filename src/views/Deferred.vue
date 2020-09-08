<template>
  <component v-bind:is="currentComponent" />
</template>

<script>

  import { mapState } from 'vuex'

  import FileUpload from '@/components/FileUpload.vue'
  import JobStatus from '@/components/JobStatus.vue'
  import VideoPlayer from '@/components/VideoPlayer.vue'

  export default {
    components: {
      FileUpload,
      JobStatus,
      VideoPlayer
    },

    data () {
      return {
        // currentComponent: 'FileUpload'
      }
    },

    computed: {
      currentComponent () {
        if (this.videoStatus === 'uploaded' ||
          this.videoStatus === 'processing' ||
          this.videoStatus === 'initializing' ||
          this.videoStatus === 'error') {
          return 'JobStatus'
        } else if (this.videoStatus === 'completed') {
          return 'VideoPlayer'
        } else {
          return 'FileUpload'
        }
      },
      ...mapState([
        'videoStatus'
      ])
    }
  }
</script>

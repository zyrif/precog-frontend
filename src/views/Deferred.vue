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
        if (this.deferredStatus == 'uploaded') {
          return 'JobStatus'
        } else if (this.deferredStatus == 'completed') {
          return 'VideoPlayer'
        } else {
          return 'FileUpload'
        }
      },
      ...mapState([
        'deferredStatus'
      ])
    }
  }
</script>

<template>
  <component v-bind:is="currentComponent" />
</template>

<script>
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
        currentComponent: 'FileUpload'
      }
    }
  }
</script>

<template>
  <div class="home">
    <v-container>
      <v-data-table
        :headers="headers"
        :items="items"
        :item-key="items.id"
        :loading="isLoading"
        class="elevation-1"
      >
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

        <template
          v-if="!hasValues"
          v-slot:footer
        >
          <div />
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
        isLoading: true,
        refreshJob: '',
        items: []
      }
    },
    computed: {
      headers () {
        const values = [
          {
            text: 'ID',
            align: 'start',
            value: 'id'
          },
          {
            text: 'Date',
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
        return this.items.length > 0
      },
      // map vuex getters
      ...mapGetters([
        'authToken',
        'videoAPIUrl'
      ])
    },
    mounted: function () {
      this.fetchData()
      this.refreshJob = setInterval(() => {
        this.fetchData()
      }, 3000)
    },
    destroyed: function () {
      clearInterval(this.refreshJob)
    },
    methods: {
      fetchData () {
        axios
          .get(this.videoAPIUrl, {
            headers: { 'Authorization': `token ${this.authToken}` }
          })
          .then(
            (response) => {
              this.items = response.data
              this.isLoading = false
            }
          )
          .catch(
            (respose) => {
              // eslint-disable-next-line
              console.log(response)
            }
          )
      }
    }
  }
</script>

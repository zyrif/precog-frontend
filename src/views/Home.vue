<template>
  <div class="home">
    <v-container>
      <v-data-table
        :headers="headers"
        :items="items"
        :item-key="id"
        :loading="isLoading"
        class="elevation-1"
      >
        <template v-slot:no-data>
          <p class="display-1">
            No Data!
          </p>
        </template>

        <template v-slot:progress>
          <v-progress-linear
            :height="10"
            indeterminate
          />
        </template>

        <template
          v-if="!hasValues()"
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
    //
    data () {
      return {
        isLoading: true,
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
            text: 'Status',
            value: 'status'
          },
          {
            text: 'Length',
            value: 'video_length'
          },
          {
            text: 'Size',
            value: 'video_size'
          }
        ]

        return values
      },

      // map vuex getters
      ...mapGetters([
        'authToken',
        'videoAPIUrl'
      ])
    },
    mounted: function () {
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
          // eslint-disable-next-line
          console.log(response)
        )
    },
    methods: {
      hasValues () {
        return this.items.length > 0
      }
    }
  }
</script>

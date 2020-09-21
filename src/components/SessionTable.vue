<template>
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
          v-on:click.stop="toggleDialog()"
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
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'

  export default {
    name: 'SessionTable',
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
        sessionDeleteDialog: false,
        tableRefreshJob: '',
        tableRowItems: []
      }
    },
    computed: {
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

      toggleDialog () {
        this.$emit('toggleDialog')
      },

      openPlayer (item) {
        this.$emit('openPlayer', item)
      },

      deleteSession (item) {
        this.$emit('deleteSession', item)
      }
    }
  }
</script>

<style>

</style>

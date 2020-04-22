<template>
  <v-card>
    <v-toolbar flat color="grey lighten-3">
      <v-card-title>Form Submissions</v-card-title>
    </v-toolbar>
    <v-container>
      <!-- search input -->
      <div class="ipc-search">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="pb-5"
        ></v-text-field>
      </div>
      <!-- table alert -->
      <v-alert v-if="showAlert" :type="alertType" tile dense>{{alertMessage}}</v-alert>
      <!-- table header -->
      <v-data-table
        :headers="headers"
        :items="submissions"
        :items-per-page="10"
        :search="search"
        :loading="loading"
        loading-text="Loading... Please wait"
        item-key="id"
        class="ipc-table"
        :expanded.sync="expanded"
        show-expand
      >
        <!-- expanded row -->
        <template v-slot:expanded-item="{ headers, item }">
          <td :class="[responsiveCell]"></td>
          <td :colspan="headers.length - 1" :class="[responsiveCell]">
            <div class="ipc-expanded">
              <!-- form data -->
              <strong>Form Data:</strong>
              <span><pre>{{ JSON.stringify(item.data, null, 2) }}</pre></span>
            </div>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </v-card>
</template>

<script>

import ipcService from '@/services/ipcService';

export default {
  name: 'SubmissionsTable',
  computed: {
    responsiveCell () {
      return (this.$vuetify.breakpoint.name == 'xs') ? 'v-data-table__mobile-table-row' : '';
    }
  },
  data() {
    return {
      // vuetify data table
      search: '',
      headers: [
        { text: '', value: 'data-table-expand' },
        { text: 'Created', value: 'created' },
        { text: 'Business Name', align: 'start', value: 'name' },
        { text: 'Confirmation ID', align: 'start', value: 'confirmationId' },
      ],
      submissions: [],
      loading: true,
      showAlert: false,
      alertType: null,
      alertMessage: '',
      expanded: []
    };
  },
  methods: {
    formatDate(date){
      return (date) ? new Date(date).toLocaleString() : 'N/A';
    },
    // get table data from frontend service layer
    getData() {
      ipcService
        .getAllIPCData()
        .then(response => {
          const data = response.data;

          const submissions = Object.keys(data).map(k => {
            let submission = data[k];
            return {
              name: submission.business.name,
              created: this.formatDate(submission.business.createdAt),
              confirmationId: submission.confirmationId,
              data: submission
            };
          });

          // TODO: format data here for use in data table
          if (!submissions.length) {
            // TODO: use a base alert component if one has been added to the project
            this.showTableAlert('info', 'No Submissions found');
          }
          this.submissions = submissions;
        })
        .catch(() => {
          // TODO: use a base alert component if one has been added to the project
          this.showTableAlert('error', 'No response from server');
        });
    },
    showTableAlert(typ, msg) {
      this.showAlert = true;
      this.alertType = typ;
      this.alertMessage = msg;
      this.loading = false;
    },
  },
  mounted() {
    this.getData();
  },
  watch: {
    // hide data table progress bar when submissions have been returned from backend
    submissions() {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.ipc-search {
  width: 100%;
  max-width: 20em;
  float: right;
}
.ipc-table {
  clear: both;
}
.ipc-table >>> tr.v-data-table__expanded__row td {
  border-bottom: 0 !important;
}
.ipc-table >>> tr.v-data-table__expanded__content {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
.ipc-table >>> tr.v-data-table__expanded__content td {
  padding-bottom: 1em;
}
div.ipc-expanded {
  font-size: 85% !important;
  color: #494949 !important;
  padding: 1rem 0;
}
/* mobile view */
tr.v-data-table__expanded__content
  td.v-data-table__mobile-table-row:nth-child(1) {
  display: none !important;
}
tr.v-data-table__expanded__content
  td.v-data-table__mobile-table-row:not(:nth-child(1)) {
  padding: 0;
}
td.v-data-table__mobile-table-row div.ipc-expanded {
  padding: 0.2rem 1rem;
}
</style>

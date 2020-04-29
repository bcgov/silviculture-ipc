<template>
  <v-card>
    <v-toolbar flat color="grey lighten-3">
      <v-card-title>Submission Status History</v-card-title>
    </v-toolbar>

    <v-container>
      <v-alert v-if="showAlert" :type="alertType" tile dense>{{alertMessage}}</v-alert>

      <v-data-table
        :headers="headers"
        :items="statuses"
        :items-per-page="10"
        :search="search"
        :loading="loading"
        loading-text="Loading... Please wait"
        item-key="inspectionStatusId"
        class="status-table"
      >
        <template v-slot:item.createdAt="{ item }">{{ formatDate(item.createdAt) }}</template>

        <template v-slot:item.grade="{ item }">
          <v-icon v-if="item.grade && item.grade === 'PASS'" color="green">check</v-icon>
          <v-icon v-else color="red">close</v-icon>
        </template>

        <template v-slot:item.inspectorName="{ item }">{{ formatInspector(item.inspectorName) }}</template>

        <template v-slot:item.inspectionDate="{ item }">{{ formatDate(item.inspectionDate) }}</template>
      </v-data-table>
    </v-container>
  </v-card>
</template>

<script>
import ipcService from '@/services/ipcService';

export default {
  name: 'SubmissionsTable',
  computed: {
    responsiveCell() {
      return this.$vuetify.breakpoint.name == 'xs'
        ? 'v-data-table__mobile-table-row'
        : '';
    }
  },
  data() {
    return {
      search: '',
      headers: [
        { text: 'Status', value: 'status' },
        { text: 'Date', align: 'start', value: 'createdAt' },
        { text: 'Grade', align: 'start', value: 'grade' },
        { text: 'Assigned Inspector', value: 'inspectorName' },
        { text: 'Inspection Date', value: 'inspectionDate' }
      ],
      statuses: [],
      ipcPlanId: this.$route.params.ipcPlanId,
      loading: true,
      showAlert: false,
      alertType: null,
      alertMessage: '',
      expanded: []
    };
  },
  methods: {
    formatDate(date) {
      return date ? new Date(date).toLocaleString() : 'N/A';
    },
    formatInspector(inspectorName) {
      return inspectorName ? inspectorName : 'N/A';
    },
    getData() {
      ipcService
        .getIPCContent(this.ipcPlanId)
        .then(response => {
          this.statuses = response.data.inspectionStatuses;
          if (!this.statuses.length) {
            this.showTableAlert('error', 'Inspection statuses not found');
          }
        })
        .catch(() => {
          this.showTableAlert('error', 'No response from server');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    showTableAlert(typ, msg) {
      this.showAlert = true;
      this.alertType = typ;
      this.alertMessage = msg;
      this.loading = false;
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
.status-search {
  width: 100%;
  max-width: 20em;
  float: right;
}
.status-table {
  clear: both;
}
.status-table >>> tr.v-data-table__expanded__row td {
  border-bottom: 0 !important;
}
.status-table >>> tr.v-data-table__expanded__content {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
.status-table >>> tr.v-data-table__expanded__content td {
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

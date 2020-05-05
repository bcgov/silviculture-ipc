<template>
  <v-container>
    <v-alert v-if="showAlert" :type="alertType" tile dense>{{alertMessage}}</v-alert>

    <v-data-table
      disable-pagination
      :hide-default-footer="true"
      :headers="headers"
      :items="statuses"
      :loading="loading"
      loading-text="Loading... Please wait"
      show-expand
      :single-expand="true"
      :expanded.sync="expanded"
      item-key="inspectionStatusId"
      class="status-table"
    >
      <template v-slot:item.createdAt="{ item }">{{ formatDate(item.createdAt) }}</template>

      <template v-slot:item.grade="{ item }">
        <v-icon v-if="item.grade && item.grade.toUpperCase() === 'PASS'" color="green">check</v-icon>
        <v-icon
          v-else-if="item.grade && item.grade.toUpperCase() === 'FAIL'"
          color="secondary"
        >close</v-icon>
        <v-icon v-else color="secondary">mdi-help-circle</v-icon>
      </template>

      <template v-slot:item.inspectorName="{ item }">{{ item.inspectorName }}</template>

      <template v-slot:item.inspectionDate="{ item }">{{ formatDate(item.inspectionDate) }}</template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <p>
            <strong>Decision Reason</strong>
            {{ item.reasonsForDecision }}
          </p>
          <p>
            <strong>Guidance Plan</strong>
            {{ item.guidancePlan }}
          </p>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import ipcService from '@/services/ipcService';

export default {
  name: 'StatusTable',
  props:{
    ipcPlanId: {
      required: true,
      type: String
    }
  },
  computed: {
    responsiveCell() {
      return this.$vuetify.breakpoint.name == 'xs'
        ? 'v-data-table__mobile-table-row'
        : '';
    }
  },
  data() {
    return {
      headers: [
        { text: 'Status', value: 'status' },
        { text: 'Date', align: 'start', value: 'createdAt' },
        { text: 'Grade', align: 'start', value: 'grade' },
        { text: 'Assigned Inspector', value: 'inspectorName' },
        { text: 'Inspection Date', value: 'inspectionDate' }
      ],
      expanded: [],
      statuses: [],
      loading: true,
      showAlert: false,
      alertType: null,
      alertMessage: ''
    };
  },
  methods: {
    formatDate(date) {
      return date ? new Date(date).toLocaleString() : '';
    },
    getData() {
      ipcService
        .getIPCInspectionStatuses(this.ipcPlanId)
        .then(response => {
          this.statuses = response.data;
          if (!this.statuses.length) {
            this.showTableAlert('warning', 'No inspection statuses found');
          }
        })
        .catch(error => {
          this.showTableAlert('error', error.message);
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
.status-table >>> tbody tr:nth-of-type(odd) {
  background-color: #f5f5f5;
}
.status-table >>> thead tr th {
  font-weight: normal;
  color: #003366 !important;
  font-size: 1.1em;
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

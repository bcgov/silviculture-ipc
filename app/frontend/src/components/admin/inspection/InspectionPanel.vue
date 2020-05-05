<template>
  <v-card outlined class="mx-auto inspection-panel">
    <v-progress-linear indeterminate v-if="loading" color="primary" class="mb-2" />
    <v-alert v-if="error" type="error" tile dense>{{ error }}</v-alert>

    <h2 class="inspection-heading">Inspection Status</h2>
    <p>
      <strong>Current Status:</strong>
      {{ currentStatus.status }}
      <span v-if="currentStatus.inspectorName">
        <br />
        <strong>Assigned To:</strong>
        {{ currentStatus.inspectorName }}
      </span>
      <span v-if="currentStatus.inspectionDate">
        <br />
        <strong>Inspection Date:</strong>
        {{ new Date(currentStatus.inspectionDate).toLocaleString('en-CA', { dateStyle:'long'}) }}
      </span>
    </p>

    <v-row>
      <v-col cols="12" xl="8" offset-xl="2">
        <div v-if="currentStatus.status === statuses.SUBMITTED">
          <Status
            label="Assign"
            :statusToSet="statuses.ASSIGNED"
            :ipcPlanId="ipcPlanId"
            v-on:status-updated="getInspectionData"
          />
        </div>
        <div v-if="currentStatus.status === statuses.ASSIGNED">
          <Status
            label="Schedule"
            :statusToSet="statuses.SCHEDULED"
            v-on:status-updated="getInspectionData"
            :existingStatus="currentStatus"
            :ipcPlanId="ipcPlanId"
          />
          <br />
          <Status
            label="Re-assign"
            :statusToSet="statuses.ASSIGNED"
            v-on:status-updated="getInspectionData"
            :existingStatus="currentStatus"
            :ipcPlanId="ipcPlanId"
            :primary="false"
          />
        </div>
        <div v-if="currentStatus.status === statuses.SCHEDULED">
          <Status
            label="Complete"
            :statusToSet="statuses.COMPLETED"
            v-on:status-updated="getInspectionData"
            :existingStatus="currentStatus"
            :ipcPlanId="ipcPlanId"
          />
          <br />
          <Status
            label="Follow Up"
            :statusToSet="statuses.FOLLOWUP"
            v-on:status-updated="getInspectionData"
            :existingStatus="currentStatus"
            :ipcPlanId="ipcPlanId"
            :primary="false"
          />
          <br />
          <Status
            label="Re-assign"
            :statusToSet="statuses.CANCELLED"
            v-on:status-updated="getInspectionData"
            :existingStatus="currentStatus"
            :ipcPlanId="ipcPlanId"
            :primary="false"
          />
          <br />
          <Status
            label="Cancel Inspection"
            :statusToSet="statuses.CANCELLED"
            v-on:status-updated="getInspectionData"
            :existingStatus="currentStatus"
            :ipcPlanId="ipcPlanId"
            :primary="false"
          />
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="historyDialog" width="1200">
      <template v-slot:activator="{ on }">
        <v-btn text small color="primary" class="pl-0 mt-5" v-on="on">
          <v-icon class="mr-1">history</v-icon>Show Status History
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-3" primary-title>Status History</v-card-title>

        <StatusTable :ipcPlanId="ipcPlanId" class="my-4" />

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="historyDialog = false">CLOSE</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

import ipcService from '@/services/ipcService';
import StatusTable from '@/components/admin/StatusTable.vue';
import Status from '@/components/admin/inspection/Status.vue';
import { Statuses } from '@/utils/constants';

export default {
  name: 'InspectionPanel',
  components: {
    Status,
    StatusTable,
  },
  props: {
    ipcPlanId: {
      required: true,
      type: String
    },
  },
  data() {
    return {
      error: '',
      historyDialog: false,
      loading: true,
      statusHistory: {},
      statuses: Statuses
    };
  },
  computed: {
    ...mapGetters('auth', ['email', 'fullName']),
    currentStatus() {
      if (this.statusHistory && this.statusHistory[0]) {
        // Statuses are returned in date precedence, the 0th item in the array is the current status
        return this.statusHistory[0];
      } else {
        return {};
      }
    }
  },
  methods: {
    getInspectionData() {
      this.loading = true;
      ipcService
        .getIPCInspectionStatuses(this.ipcPlanId)
        .then(response => {
          this.statusHistory = response.data;
          if (!this.statusHistory.length) {
            this.error = 'No inspection statuses found';
          }
        })
        .catch(error => {
          this.error = error.message;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.getInspectionData();
  }
};
</script>

<style lang="scss" scoped>
.inspection-panel {
  background-color: #f5f5f5;
  margin-bottom: 2em;
  padding: 1em 1.5em;
  .inspection-heading {
    font-size: 1.5em;
    margin-bottom: 0.5em;
    color: #003366;
  }
}
</style>

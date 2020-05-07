<template>
  <v-card outlined class="mx-auto inspection-panel">
    <v-progress-linear indeterminate v-if="loading" color="primary" class="mb-2" />
    <v-alert v-if="error" type="error" tile dense>{{ error }}</v-alert>

    <h2 class="inspection-heading">Inspection Status</h2>
    <div v-if="!loading">
      <p>
        <strong>Current Status:</strong>
        {{ currentStatus.status }}
        <br />
        <strong>Assigned To:</strong>
        {{ currentStatus.inspectorName ? currentStatus.inspectorName : 'N/A' }}
        <br />
        <strong>Inspection Date:</strong>
        {{ currentStatus.inspectionDate ? new Date(currentStatus.inspectionDate).toLocaleString('en-CA', { dateStyle:'long'}) : 'N/A'}}
      </p>

      <v-row>
        <v-col cols="12" xl="8" offset-xl="2">
          <Status
            :existingStatus="currentStatus"
            :statusToSet="statuses.ASSIGNED"
            :ipcPlanId="ipcPlanId"
            v-on:status-updated="getInspectionData"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" lg="6" xl="4" offset-xl="2">
          <v-dialog v-model="historyDialog" width="1200">
            <template v-slot:activator="{ on }">
              <v-btn block outlined color="textLink" v-on="on">VIEW HISTORY</v-btn>
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
        </v-col>

        <v-col cols="12" lg="6" xl="4">
          <v-btn block color="primary" disabled v-on="on">UPDATE</v-btn>
        </v-col>
      </v-row>
    </div>
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

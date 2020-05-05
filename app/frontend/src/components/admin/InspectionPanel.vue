<template>
  <v-card outlined class="mx-auto inspection-panel">
    <v-progress-linear indeterminate v-if="loading" color="primary" class="mb-2" />
    <v-alert v-if="error" type="error" tile dense>{{ error }}</v-alert>

    <h2 class="inspection-heading">Inspection Status</h2>
    <p>
      <strong>Current Status:</strong>
      {{ currentStatus }}
    </p>

    <v-row>
      <v-col cols="12" xl="8" offset-xl="2">
        <!-- Assign -->
        <div>
          <v-btn
            v-if="!assignCard"
            block
            color="primary"
            class="pl-0"
            @click="assignCard = true"
          >ASSIGN</v-btn>

          <v-card v-show="assignCard" class="elevation-4">
            <v-card-title>Assign</v-card-title>
            <v-card-text>
              <label>Inspector Name</label>
              <v-text-field v-model="inspectorName" dense flat outlined solo />

              <label>Inspector Email (Optional)</label>
              <v-text-field v-model="inspectorEmail" dense flat outlined solo />

              <div class="text-right">
                <v-btn
                  text
                  small
                  color="primary"
                  class="pl-0 my-0 text-end"
                  @click="assignToCurrentUser"
                >
                  <v-icon class="mr-1">person</v-icon>ASSIGN TO ME
                </v-btn>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn small color="primary" @click="assignCard = false;">SAVE</v-btn>

              <v-btn small color="primary" @click="assignCard = false" text>CANCEL</v-btn>
            </v-card-actions>
          </v-card>
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
//import { Statuses } from '@/utils/constants';

export default {
  name: 'InspectionPanel',
  components: {
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
      assignCard: false,

      error: '',
      historyDialog: false,
      inspectorName: '',
      inspectorEmail: '',
      loading: true,
      statusHistory: {}
    };
  },
  computed: {
    ...mapGetters('auth', ['email', 'fullName']),
    currentStatus() {
      if (this.statusHistory && this.statusHistory[0]) {
        // Statuses are returned in date precedence, the 0th item in the array is the current status
        return this.statusHistory[0].status;
      } else {
        return '';
      }
    }
  },
  methods: {
    assignToCurrentUser() {
      this.inspectorName = this.fullName;
      this.inspectorEmail = this.email;
    },
    getInspectionData() {
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

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

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" xl="8" offset-xl="2">
            <label>Update Status</label>
            <v-select
              block
              dense
              flat
              outlined
              solo
              single-line
              label="Select status to set"
              :items="items"
              item-text="label"
              item-value="statusVal"
              v-model="statusToSet"
              :rules="[v => !!v || 'Status is required']"
              @change="statusFields = true"
            />

            <div v-show="statusFields">
              <div v-if="statusToSet === statuses.SCHEDULED">
                <label>Inspection Date</label>
                <v-menu
                  v-model="inspectionDateMenu"
                  :close-on-content-click="true"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="inspectionDate"
                      :rules="[v => !!v || 'Date is required']"
                      placeholder="yyyy-mm-dd"
                      append-icon="event"
                      v-on:click:append="inspectionDateMenu=true"
                      readonly
                      v-on="on"
                      dense
                      flat
                      outlined
                      solo
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="inspectionDate" @input="inspectionDateMenu = false"></v-date-picker>
                </v-menu>
              </div>

              <label>Inspector Name</label>
              <v-text-field
                v-model="inspectorName"
                :rules="[v => !!v || 'Name is required']"
                dense
                flat
                outlined
                solo
              />

              <label>Inspector Email (Optional)</label>
              <v-text-field v-model="inspectorEmail" dense flat outlined solo />

              <div v-if="statusToSet === statuses.ASSIGNED" class="text-right">
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
            </div>
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
            <v-btn block color="primary" v-on="on" @click="updateStatus">UPDATE</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

import ipcService from '@/services/ipcService';
import StatusTable from '@/components/admin/StatusTable.vue';
import { Statuses } from '@/utils/constants';

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
      on: false,
      error: '',
      historyDialog: false,
      inspectionDateMenu: false,
      loading: true,
      statusHistory: {},
      statuses: Statuses,
      statusFields: false,
      statusToSet: '',
      valid: false,

      // Fields
      inspectorName: this.currentStatus ? this.currentStatus.inspectorName : '',
      inspectorEmail: this.currentStatus ? this.currentStatus.inspectorEmail : '',
      inspectionDate: ''
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
    },
    items() {
      switch(this.currentStatus.status) {
        case this.statuses.SUBMITTED:
          return [{
            label: 'Assign',
            statusVal: this.statuses.ASSIGNED
          }];
        case this.statuses.ASSIGNED:
          return [{
            label: 'Schedule',
            statusVal: this.statuses.SCHEDULED
          },
          {
            label: 'Re-Assign',
            statusVal: this.statuses.ASSIGNED
          }];
        case this.statuses.SCHEDULED:
          return [{
            label: 'Complete',
            statusVal: this.statuses.COMPLETED
          },
          {
            label: 'Follow-up',
            statusVal: this.statuses.FOLLOWUP
          },
          {
            label: 'Re-schedule',
            statusVal: this.statuses.SCHEDULED
          },
          {
            label: 'Cancel',
            statusVal: this.statuses.CANCELLED
          }];
        default:
          return [];
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
    },
    assignToCurrentUser() {
      this.inspectorName = this.fullName;
      this.inspectorEmail = this.email;
    },
    resetForm() {
      this.statusFields = false;
      this.$refs.form.resetValidation();
      this.statusToSet = null;
      this.statusFields = false;
    },
    async updateStatus() {
      try {
        this.error = '';
        if(this.$refs.form.validate()) {
          if(!this.statusToSet) {
            throw new Error('No Status');
          }

          const statusBody = {
            status: this.statusToSet,
            inspectorName: this.inspectorName
          };
          if(this.inspectorEmail) {
            statusBody.inspectorEmail = this.inspectorEmail;
          }
          if(this.inspectionDate) {
            statusBody.inspectionDate = this.inspectionDate;
          }
          const response = await ipcService.sendIPCInspectionStatuses(this.ipcPlanId, statusBody);
          if (!response.data) {
            throw new Error('No response data from API while submitting form');
          }
          this.resetForm();
          this.getInspectionData();
        }
      } catch (error) {
        console.error(`Error updating status: ${error}`); // eslint-disable-line no-console
        this.error = 'An error occured while trying to update the status';
      }
    },
  },
  created() {
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

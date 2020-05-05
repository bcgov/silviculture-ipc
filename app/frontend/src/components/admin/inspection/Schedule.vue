<template>
  <div>
    <!-- Assign -->
    <v-btn
      v-if="!scheduleCard"
      block
      color="primary"
      class="pl-0"
      @click="scheduleCard = true"
    >SCHEDULE</v-btn>
    <v-card v-show="scheduleCard" class="elevation-4">
      <v-alert v-if="error" type="error" tile dense>{{ error }}</v-alert>
      <v-card-title>Schedule</v-card-title>
      <v-card-text>
        <label>Inspector Name</label>
        <v-text-field v-model="inspectorName" dense flat outlined solo />

        <label>Inspector Email (Optional)</label>
        <v-text-field v-model="inspectorEmail" dense flat outlined solo />

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
      </v-card-text>

      <v-card-actions>
        <v-btn small color="primary" @click="assign">SAVE</v-btn>

        <v-btn small color="primary" @click="scheduleCard = false" text>CANCEL</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import ipcService from '@/services/ipcService';
import { Statuses } from '@/utils/constants';

export default {
  name: 'Assign',
  props: {
    existingStatus: {
      required: false,
      type: Object
    },
    ipcPlanId: {
      required: true,
      type: String
    },
  },
  data() {
    return {
      scheduleCard: false,
      startDateMenu: false,
      error: '',
      inspectorName: this.existingStatus ? this.existingStatus.inspectorName : '',
      inspectorEmail: this.existingStatus ? this.existingStatus.inspectorEmail : '',
      inspectionDate: ''
    };
  },
  computed: {
    ...mapGetters('auth', ['email', 'fullName'])
  },
  methods: {
    assignToCurrentUser() {
      this.inspectorName = this.fullName;
      this.inspectorEmail = this.email;
    },
    async assign() {
      try {
        const status = {
          status: Statuses.SCHEDULED,
          inspectorName: this.inspectorName,
          inspectionDate: this.inspectionDate
        };
        if(this.inspectorEmail) {
          status.inspectorEmail = this.inspectorEmail;
        }
        const response = await ipcService.sendIPCInspectionStatuses(this.ipcPlanId, status);
        if (!response.data) {
          throw new Error('No response data from API while submitting form');
        }
        this.assignCard = false;
        this.$emit('status-updated');
      } catch (error) {
        console.error(`Error updating status: ${error}`); // eslint-disable-line no-console
        this.error = 'An error occured while trying to update the status';
      }
    },
  }
};
</script>

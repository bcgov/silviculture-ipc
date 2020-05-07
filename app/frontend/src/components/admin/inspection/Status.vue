<template>
  <div>
    <v-alert v-if="error" type="error" tile dense>{{ error }}</v-alert>

    <label>Update Status</label>
    <v-select
      block
      dense
      flat
      outlined
      solo
      single-line
      label="Select status to set"
      class="pl-0"
      :items="items"
      v-model="statusToSet"
      @change="statusCard = true"
    />

    <div v-show="statusCard">
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
      <v-text-field v-model="inspectorName" dense flat outlined solo />

      <label>Inspector Email (Optional)</label>
      <v-text-field v-model="inspectorEmail" dense flat outlined solo />

      <div v-if="statusToSet === statuses.ASSIGNED" class="text-right">
        <v-btn text small color="primary" class="pl-0 my-0 text-end" @click="assignToCurrentUser">
          <v-icon class="mr-1">person</v-icon>ASSIGN TO ME
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import ipcService from '@/services/ipcService';
import { Statuses } from '@/utils/constants';

export default {
  name: 'Status',
  props: {
    ipcPlanId: {
      required: true,
      type: String
    },
    label: {
      required: false,
      type: String
    },
    existingStatusObj: {
      required: true,
      type: Object
    },
    primary: {
      required: false,
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      error: '',
      inspectionDateMenu: false,
      items: [],
      statusCard: false,
      statuses: Statuses,
      statusToSet: '',

      // Fields
      inspectorName: this.existingStatusObj ? this.existingStatusObj.inspectorName : '',
      inspectorEmail: this.existingStatusObj ? this.existingStatusObj.inspectorEmail : '',
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
    setUpOptions() {
      this.items = ['Assign'];
    },
    async setStatus() {
      try {
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
        this.statusCard = false;
        this.$emit('status-updated');
      } catch (error) {
        console.error(`Error updating status: ${error}`); // eslint-disable-line no-console
        this.error = 'An error occured while trying to update the status';
      }
    },
  },
  mounted() {
    this.setUpOptions();
  }
};
</script>

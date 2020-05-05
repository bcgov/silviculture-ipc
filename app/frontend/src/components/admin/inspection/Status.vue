<template>
  <div>
    <v-btn
      v-if="!statusCard"
      block
      color="primary"
      class="pl-0"
      :outlined="!primary"
      @click="statusCard = true"
    >{{ label }}</v-btn>

    <v-card v-show="statusCard" class="elevation-4">
      <v-alert v-if="error" type="error" tile dense>{{ error }}</v-alert>
      <v-card-title>{{ label }}</v-card-title>

      <v-card-text>
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
      </v-card-text>

      <v-card-actions>
        <v-btn small color="primary" @click="setStatus">SAVE</v-btn>

        <v-btn small color="primary" @click="statusCard = false" text>CANCEL</v-btn>
      </v-card-actions>
    </v-card>
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
    statusToSet: {
      required: true,
      type: String
    },
    existingStatusObj: {
      required: false,
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
      statusCard: false,
      statuses: Statuses,

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
  }
};
</script>

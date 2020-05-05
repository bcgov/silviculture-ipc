<template>
  <div>
    <!-- Assign -->
    <v-btn v-if="!assignCard" block color="primary" class="pl-0" @click="assignCard = true">ASSIGN</v-btn>

    <v-card v-show="assignCard" class="elevation-4">
      <v-alert v-if="error" type="error" tile dense>{{ error }}</v-alert>
      <v-card-title>Assign</v-card-title>
      <v-card-text>
        <label>Inspector Name</label>
        <v-text-field v-model="inspectorName" dense flat outlined solo />

        <label>Inspector Email (Optional)</label>
        <v-text-field v-model="inspectorEmail" dense flat outlined solo />

        <div class="text-right">
          <v-btn text small color="primary" class="pl-0 my-0 text-end" @click="assignToCurrentUser">
            <v-icon class="mr-1">person</v-icon>ASSIGN TO ME
          </v-btn>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn small color="primary" @click="assign">SAVE</v-btn>

        <v-btn small color="primary" @click="assignCard = false" text>CANCEL</v-btn>
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
    ipcPlanId: {
      required: true,
      type: String
    },
  },
  data() {
    return {
      assignCard: false,
      error: '',
      inspectorName: '',
      inspectorEmail: ''
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
          status: Statuses.ASSIGNED,
          inspectorName: this.inspectorName
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

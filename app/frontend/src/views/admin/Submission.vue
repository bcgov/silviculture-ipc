<template>
  <v-container>
    <BaseSecure admin>
      <v-progress-linear v-if="gettingForm" color="primary" />
      <v-alert v-else-if="getFormError" type="error" tile dense>{{ getFormError }}</v-alert>
      <div v-else>
        <h1>{{ business.name }}</h1>
        <h4 class="heading-detail">
          Submitted:
          <span>{{ new Date(ipcPlan.createdAt).toLocaleString() }}</span>
        </h4>
        <h4 class="heading-detail">
          Confirmation ID:
          <span>{{ confirmationId }}</span>
        </h4>
        <h4 class="heading-detail">
          Operation Dates:
          <span>{{ location.startDate }} - {{ location.endDate }}</span>
        </h4>

        <v-row>
          <v-col cols="12" md="8" class="pl-0 pt-0">
            <AdminReviewSubmission />
          </v-col>
          <v-col cols="12" md="4">
            <InspectionPanel />
          </v-col>
        </v-row>
      </div>
    </BaseSecure>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import AdminReviewSubmission from '@/components/admin/AdminReviewSubmission.vue';
import InspectionPanel from '@/components/admin/InspectionPanel.vue';

export default {
  name: 'Submission',
  components: {
    InspectionPanel,
    AdminReviewSubmission
  },
  props: ['ipcPlanId'],
  data() {
    return {
      error: false,
      ipcPlanData: {},
      showFv: false
    };
  },
  computed: {
    ...mapGetters('form', ['business', 'location', 'getFormError', 'ipcPlan']),
    confirmationId() {
      if(this.ipcPlan && this.ipcPlan.ipcPlanId) {
        return this.ipcPlan.ipcPlanId.split('-')[0].toUpperCase();
      } else {
        return '';
      }
    },
  },
  methods: {
    ...mapMutations('form', ['setGettingForm']),
    ...mapActions('form', ['getForm'])
  },
  async mounted() {
    this.setGettingForm(true);
    await this.getForm(this.ipcPlanId);
  }
};
</script>

<style scoped>
.heading-detail {
  margin-top: 0.5em;
}
.heading-detail span {
  font-weight: lighter;
}
</style>

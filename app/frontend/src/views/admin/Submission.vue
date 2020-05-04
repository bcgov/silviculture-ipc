<template>
  <v-container>
    <BaseSecure admin>
      <v-progress-linear v-if="gettingForm" color="primary" />
      <v-alert v-else-if="getFormError" type="error" tile dense>{{ getFormError }}</v-alert>
      <div v-else>
        <h1>{{ business.name }}</h1>
        <h3>Submitted: {{ new Date(ipcPlan.createdAt).toLocaleString() }}</h3>

        <v-row>
          <v-col cols="12" md="8" class="pl-0 pt-0">
            <AdminReviewSubmission />
          </v-col>
          <v-col cols="12" md="4">
            <v-card outlined class="mx-auto">
              <InspectionPanel />
            </v-card>
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
    ...mapGetters('form', ['business', 'getFormError', 'ipcPlan']),
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

<template>
  <v-container>
    <BaseSecure admin>
      <v-progress-linear v-if="gettingForm" color="primary" />

      <v-alert v-if="getFormError" type="error" tile dense>{{ getFormError }}</v-alert>

      <div v-if="!gettingForm">
        <v-row>
          <v-col cols="12" sm="8" lg="10">
            <h1>{{ business.name }}</h1>
            <h4 class="heading-detail">
              Submitted:
              <span>{{ new Date(ipcPlan.createdAt).toLocaleString('en-CA', { dateStyle:'long', timeStyle:'short' }) }}</span>
            </h4>
            <h4 class="heading-detail">
              Confirmation ID:
              <span>{{ ipcPlan.ipcPlanId.split('-')[0].toUpperCase() }}</span>
            </h4>
            <h4 class="heading-detail">
              Operation Dates:
              <span>{{ location.startDate }} - {{ location.endDate }}</span>
            </h4>
          </v-col>
          <v-col cols="12" sm="4" lg="2" class="text-sm-right">
            <GeneratePdfButton :ipcPlanId="ipcPlan.ipcPlanId">
              <v-btn text small color="primary" class="pl-0">
                <v-icon class="mr-1">picture_as_pdf</v-icon>Download PDF
              </v-btn>
            </GeneratePdfButton>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="8" class="pl-0 pt-0">
            <AdminReviewSubmission />
          </v-col>
          <v-col cols="12" md="4" class="pl-0">
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
import GeneratePdfButton from '@/components/common/GeneratePdfButton.vue';
import InspectionPanel from '@/components/admin/InspectionPanel.vue';

export default {
  name: 'Submission',
  components: {
    AdminReviewSubmission,
    GeneratePdfButton,
    InspectionPanel
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
    ...mapGetters('form', ['business', 'location', 'getFormError', 'ipcPlan'])
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

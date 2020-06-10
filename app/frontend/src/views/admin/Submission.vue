<template>
  <v-container>
    <BaseSecure admin>
      <v-progress-linear indeterminate v-if="gettingForm" color="primary" class="mb-2" />

      <v-alert v-if="getFormError" type="error" tile dense>{{ getFormError }}</v-alert>

      <div v-if="!gettingForm && ipcPlan">
        <v-row>
          <v-col cols="12" sm="8" lg="10">
            <h1>{{ business.name }}</h1>
            <h4 class="heading-detail">
              Submitted:
              <span>{{ createdAtDisplay }}</span>
            </h4>
            <h4 class="heading-detail">
              Confirmation ID:
              <span>{{ ipcPlan.ipcPlanId ? ipcPlan.ipcPlanId.split('-')[0].toUpperCase() : '' }}</span>
            </h4>
            <h4 class="heading-detail">
              Operation Type:
              <span>{{ operationTypeDisplayName(ipcPlan.operationType) }}</span>
            </h4>
            <h4 class="heading-detail">
              Operation Dates:
              <span>{{ location.startDate }} - {{ location.endDate }}</span>
            </h4>
          </v-col>
          <v-col cols="12" sm="4" lg="2" class="text-sm-right">
            <GeneratePdfButton :ipcPlanId="ipcPlan.ipcPlanId">
              <v-btn text small color="textLink" class="pl-0">
                <v-icon class="mr-1">picture_as_pdf</v-icon>Download PDF
              </v-btn>
            </GeneratePdfButton>

            <v-spacer></v-spacer>
            <!-- inspector edit 'LocationEdit' component -->
            <LocationEdit v-if="showInspection" :ipcPlanId="ipcPlan.ipcPlanId" />

          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="8" class="pl-0 pt-0">
            <AdminReviewSubmission />
          </v-col>
          <v-col v-if="showInspection" cols="12" md="4" class="pl-0" order="first" order-md="last">
            <InspectionPanel :ipcPlanId="ipcPlan.ipcPlanId" v-on:note-updated="refreshNotes" />

            <NotesPanel :ipcPlanId="ipcPlan.ipcPlanId" ref="notesPanel" />
          </v-col>
        </v-row>
      </div>
    </BaseSecure>
  </v-container>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters, mapMutations } from 'vuex';

import AdminReviewSubmission from '@/components/admin/AdminReviewSubmission.vue';
import GeneratePdfButton from '@/components/common/GeneratePdfButton.vue';
import InspectionPanel from '@/components/admin/inspection/InspectionPanel.vue';
import NotesPanel from '@/components/admin/inspection/NotesPanel.vue';
import LocationEdit from '@/components/admin/inspection/LocationEdit.vue';

import { SilvipcRoles } from '@/utils/constants';

export default {
  name: 'Submission',
  components: {
    AdminReviewSubmission,
    GeneratePdfButton,
    InspectionPanel,
    NotesPanel,
    LocationEdit
  },
  props: ['ipcPlanId'],
  data() {
    return {
      error: false,
      ipcPlanData: {},
      showFv: false,
      // quick fix for getting display name
      operationTypes: [
        { type:'BRUSHING', display: 'Brushing', enabled: true },
        { type:'CONE_PICKING', display: 'Cone Picking', enabled: true },
        { type:'ENGINEERING', display: 'Engineering', enabled: true },
        { type:'LAYOUT', display: 'Layout/Timber Cruising', enabled: true },
        { type:'LOGGING', display: 'Logging', enabled: true },
        { type:'PRUNING', display: 'Pruning', enabled: true },
        { type:'RESEARCH', display: 'Research', enabled: true },
        { type:'SILVICULTURE', display: 'Silviculture', enabled: true },
        { type:'SPACING', display: 'Spacing', enabled: true },
        { type:'SURVEYING', display: 'Surveying', enabled: true },
        { type:'VEGETATION_MANAGEMENT', display: 'Vegetation Management', enabled: true },
        { type:'WILDFIRE_CAMPS', display: 'Wildfire Camps', enabled: true },
        { type:'OTHER', display: 'Other', enabled: true }
      ]
    };
  },
  computed: {
    ...mapGetters('form', ['business', 'location', 'gettingForm', 'getFormError', 'ipcPlan']),
    ...mapGetters('auth', ['hasSilvipcRoles']),
    createdAtDisplay() { return this.ipcPlan && this.ipcPlan.createdAt ? moment(this.ipcPlan.createdAt).format('MMMM D YYYY, h:mm:ss a') : 'N/A'; },
    showInspection() {
      return this.hasSilvipcRoles([SilvipcRoles.INSPECTOR]);
    },
  },
  methods: {
    ...mapMutations('form', ['setGettingForm']),
    ...mapActions('form', ['getForm']),
    refreshNotes() {
      this.$refs.notesPanel.getNotes();
    },
    operationTypeDisplayName(operationType){
      const obj =  this.operationTypes.filter( function(el){
        return el.type == operationType;
      });
      return obj[0].display;
    }
  },
  mounted() {
  },
  async created() {
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

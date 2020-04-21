<template>
  <v-container>
    <h2 class="pb-8">Please review your answers</h2>
    <hr class="orange" />

    <v-card outlined class="review-form">
      <v-row>
        <v-col offset-lg="1" cols="12" lg="11">
          <h2>
            2. Business Contact Information
            <v-btn color="primary" class="mx-5" fab small @click="setStep(2)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </h2>
          <Step2 reviewMode="true"/>
          <hr />

          <h2>
            3. Before workers arrive at your farm
            <v-btn color="primary" class="mx-5" fab small @click="setStep(3)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </h2>
          <Step3 reviewMode="true"/>
          <hr />

          <h2>
            4. After workers arrive at the silviculture/planting camp
            <v-btn color="primary" class="mx-5" fab small @click="setStep(4)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </h2>
          <Step4 reviewMode="true" />
          <hr />

          <h2>
            5. If workers become ill at the farm
            <v-btn color="primary" class="mx-5" fab small @click="setStep(5)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </h2>
          <Step5 reviewMode="true" />
        </v-col>
      </v-row>
    </v-card>

    <v-form v-model="step6Valid">
      <v-checkbox
        :rules="[v => !!v || 'You must certify to continue']"
        v-model="certifyAccurateInformation"
        label="I certify this information to be accurate"
      ></v-checkbox>

      <v-checkbox
        :rules="[v => !!v || 'You must agree to continue']"
        v-model="agreeToInspection"
        label="I agree that my farm will be subject to a site inspection"
      ></v-checkbox>
    </v-form>

    <h3 class="mt-8 pb-2">Collection Notice</h3>
    <p>
      Your personal information as well as those of your household is collected by the Ministry of Health under the authority of sections 26(a), (c), (e) and s.27(1)(a)(iii) of the Freedom of Information and Protection of Privacy Act, the Public Health Act and the federal Quarantine Act, for the purposes of reducing the spread of COVID-19. Personal information may be shared with personnel providing support services and follow-up during self-isolation.
      Should you have any questions or concerns about the collection of your personal information please contact:
      <br />
      <br />Title: Ministry of Health, Chief Privacy Officer
      <br />
      <br />Telephone: xxx-xxx-xxxx
    </p>

    <v-btn color="primary" :disabled="!step6Valid" @click="submitForm">Submit</v-btn>
    <v-btn text @click="setStep(5)">Back</v-btn>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import Step2 from '@/components/form/Step2.vue';
import Step3 from '@/components/form/Step3.vue';
import Step4 from '@/components/form/Step4.vue';
import Step5 from '@/components/form/Step5.vue';

export default {
  name: 'Step6',
  components: {
    Step2,
    Step3,
    Step4,
    Step5,
  },
  data() {
    return {
      step6Valid: false
    };
  },
  computed: {
    ...mapGetters('form', ['ipcPlan']),
    certifyAccurateInformation: {
      get() { return this.ipcPlan.certifyAccurateInformation; },
      set(value) { this.updateIpcPlan({['certifyAccurateInformation']: value}); }
    },
    agreeToInspection: {
      get() { return this.ipcPlan.agreeToInspection; },
      set(value) { this.updateIpcPlan({['agreeToInspection']: value}); }
    },
  },
  methods: {
    ...mapMutations('form', ['setStep', 'updateIpcPlan']),
    submitForm() {
      alert('TBD');
    }
  },
  mounted() {
    document.querySelectorAll('.review-form input').forEach(q => {
      q.setAttribute('readonly', 'true');
    });
  }
};
</script>

<style scoped lang="scss">
.review-form {
  background-color: #efefef;
  &::v-deep .hide-on-review {
    display: none !important;
  }
}
</style>

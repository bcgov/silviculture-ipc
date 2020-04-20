<template>
  <v-container>
    <v-stepper v-model="step" alt-labels class="elevation-0">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Before You Begin</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2">Contact Information</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 3" step="3">Before Workers Arive</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 4" step="4">After Workers Arrive</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 5" step="5">If Workers Become Ill</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="6">Review</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <Step1/>
        </v-stepper-content>

        <v-stepper-content step="2">
          <Step2/>
        </v-stepper-content>

        <v-stepper-content step="3">
          <Step3/>
        </v-stepper-content>

        <v-stepper-content step="4">
          <Step4/>
        </v-stepper-content>

        <v-stepper-content step="5">
          <Step5/>
        </v-stepper-content>

        <v-stepper-content step="6">
          <Step6/>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

import Step1 from '@/components/form/Step1.vue';
import Step2 from '@/components/form/Step2.vue';
import Step3 from '@/components/form/Step3.vue';
import Step4 from '@/components/form/Step4.vue';
import Step5 from '@/components/form/Step5.vue';
import Step6 from '@/components/form/Step6.vue';

export default {
  name: 'Form',
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6
  },
  data () {
    return {
    };
  },
  computed: {
    ...mapGetters('form', ['step']),
  }
};
</script>

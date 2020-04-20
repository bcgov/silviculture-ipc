<template>
  <v-container>
    <v-stepper v-model="step" class="elevation-0">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Step 1</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2">Step 2</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 3" step="3">Step 3</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 4" step="4">Step 4</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 5" step="5">Step 5</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="6">Step 6</v-stepper-step>
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

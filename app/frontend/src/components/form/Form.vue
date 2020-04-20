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
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="step = 3">Continue</v-btn>

          <v-btn text>Back</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="step = 1">Continue</v-btn>

          <v-btn text>Back</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import Step1 from '@/components/form/Step1.vue';

export default {
  name: 'Form',
  components: {
    Step1
  },
  data () {
    return {
      step: 1
    };
  }
};
</script>

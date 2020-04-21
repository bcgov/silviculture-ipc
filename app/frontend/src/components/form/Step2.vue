<template>
  <v-container>
    <h2 class="pb-8">Provide your business contact information</h2>
    <hr class="orange" />

    <v-container>
      <v-form ref="form" lazy-validation>
        <v-row>
          <v-col cols="12" lg="8">
            <h4 class="mb-1">Registered Business Name</h4>
            <v-text-field dense outlined flat solo />
          </v-col>
        </v-row>

        <h4>Primary Contact</h4>
        <v-row>
          <v-col cols="12" sm="6" lg="4">
            <label>First Name</label>
            <v-text-field dense outlined flat solo />
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <label>Last Name</label>
            <v-text-field dense outlined flat solo />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="4">
            <label>Phone Number</label>
            <v-text-field dense outlined flat solo />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="4">
            <label>Phone Number (Secondary Contact)</label>
            <v-text-field dense outlined flat solo />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="4">
            <label>e-mail Address (Primary Contact)</label>
            <v-text-field dense outlined flat solo />
          </v-col>
        </v-row>
      </v-form>
    </v-container>

    <hr />

    <v-btn color="primary" @click="setStep(3)">Go to Step 3</v-btn>
    <v-btn text @click="setStep(1)">Back</v-btn>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Step2',
  computed: {
  },
  methods: {
    ...mapMutations('form', ['setStep']),
  }
};
</script>


<template>
  <v-container>
    <h2 class="pb-8">Please review your answers</h2>
    <hr class="orange" />

    <v-card outlined class="silv-info-card">
      <v-card-text>FORM RESULTS HERE... unsure of format from Word doc requirements...</v-card-text>
    </v-card>

    <v-checkbox label="I certify this information to be accurate"></v-checkbox>

    <v-checkbox label="I am able to perform waste management for supporting a self-isolated worker"></v-checkbox>

    <h3 class="mt-8 pb-2">Collection Notice</h3>
    <p>
      Your personal information as well as those of your household is collected by the Ministry of Health under the authority of sections 26(a), (c), (e) and s.27(1)(a)(iii) of the Freedom of Information and Protection of Privacy Act, the Public Health Act and the federal Quarantine Act, for the purposes of reducing the spread of COVID-19. Personal information may be shared with personnel providing support services and follow-up during self-isolation.
      Should you have any questions or concerns about the collection of your personal information please contact:
      <br />
      <br />Title: Ministry of Health, Chief Privacy Officer
      <br />
      <br />Telephone: xxx-xxx-xxxx
    </p>

    <v-btn color="primary" @click="submitForm">Submit</v-btn>
    <v-btn text @click="setStep(5)">Back</v-btn>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Step6',
  computed: {
  },
  methods: {
    ...mapMutations('form', ['setStep']),
    submitForm() {
      alert('TBD');
    }
  }
};
</script>


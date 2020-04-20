<template>
  <v-container>
    <h2 class="pb-8">After workers arrive at the silviculture/planting camp</h2>

    <p>Once your temporary foreign workers arrive at camp, you are expected to continue your work enacting an infection control plan and minimize the risk of transmission of COVID-19 through the following key activities.</p>

    <br />
    <br />
    <br />
    <br />

    <v-btn color="primary" @click="incrementStep">Go to Step 5</v-btn>
    <v-btn text @click="decrementStep">Back</v-btn>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Step4',
  computed: {
  },
  methods: {
    ...mapMutations('form', ['decrementStep', 'incrementStep']),
  }
};
</script>


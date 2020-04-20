<template>
  <v-container>
    <h2 class="pb-8">Provide your business contact information</h2>

    <br />
    <br />
    <br />
    <br />

    <v-btn color="primary" @click="incrementStep">Go to Step 3</v-btn>
    <v-btn text @click="decrementStep">Back</v-btn>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Step2',
  computed: {
  },
  methods: {
    ...mapMutations('form', ['decrementStep', 'incrementStep']),
  }
};
</script>


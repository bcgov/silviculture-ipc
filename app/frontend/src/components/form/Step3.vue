<template>
  <v-container>
    <h2 class="pb-8">Before workers arrive at your farm</h2>

    <h3>Please certify:</h3>

    <br />
    <br />
    <br />
    <br />

    <v-btn color="primary" @click="incrementStep">Go to Step 4</v-btn>
    <v-btn text @click="decrementStep">Back</v-btn>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Step3',
  computed: {
  },
  methods: {
    ...mapMutations('form', ['decrementStep', 'incrementStep']),
  }
};
</script>


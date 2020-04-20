<template>
  <v-container>
    <h2 class="pb-8">If workers become ill at the farm</h2>

    <h3>Provide safe lodging and accommodation: Self-Isolation</h3>

    <br />
    <br />
    <br />
    <br />
    
    <v-btn color="primary" @click="incrementStep">Go to Step 6</v-btn>
    <v-btn text @click="decrementStep">Back</v-btn>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Step5',
  computed: {
  },
  methods: {
    ...mapMutations('form', ['decrementStep', 'incrementStep']),
  }
};
</script>


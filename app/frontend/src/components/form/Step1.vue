<template>
  <v-container>
    <h2 class="pb-8">Apply for permission to protect workers during the COVID-19 pandemic</h2>
    <h4>The Government of Canada and Province of British Columbia have initiated emergency measures to slow the spread of COVID-19. Silviculture and Planting operators must ensure a safe workplace for their workers and demonstrate proof of an Infection Prevention Control Plan.</h4>

    <br />
    <br />
    <br />
    <br />

    <v-btn color="primary" @click="incrementStep">Go to Step 2</v-btn>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Step1',
  computed: {
  },
  methods: {
    ...mapMutations('form', ['incrementStep']),
  }
};
</script>


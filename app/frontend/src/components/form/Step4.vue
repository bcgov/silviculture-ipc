<template>
  <v-container>
    <h2 class="pb-8">After workers arrive at the silviculture/planting camp</h2>
    <hr class="orange"/>

    <p>Once your temporary foreign workers arrive at camp, you are expected to continue your work enacting an infection control plan and minimize the risk of transmission of COVID-19 through the following key activities.</p>

    <h3 class="mb-1 mt-4">Implement COVID-19 Employee Education</h3>
    <p>Silviculture/planting operators need to make workers aware of the risks of COVID-19 and be prepared if workers have questions about COVID-19</p>
    <v-checkbox
      label="I have signage in place in the appropriate language on how employees can protect themselves from COVID-19"
    ></v-checkbox>
    <v-checkbox
      label="I have someone identified that workers can go to if they have questions on COVID-19"
    ></v-checkbox>

    <h3 class="mb-1 mt-4">Train workers on COVID-19 infection control</h3>
    <p>Silviculture/planting operators must provide workers with training in their language about the risk of COVID-19, safe work practices, and how to report symptoms.</p>
    <v-checkbox
      label="I have materials ready on the risk of exposure of COVID-19 and the signs and symptoms of the disease"
    ></v-checkbox>
    <v-checkbox
      label="I have materials ready on hand washing, physical distancing, and cough/sneeze etiquette"
    ></v-checkbox>
    <v-checkbox
      label="I can provide locations of washing facilities, including dispensing stations for alcohol-based hand rubs"
    ></v-checkbox>
    <v-checkbox
      label="I have materials ready on how to seek first aid"
    ></v-checkbox>
    <v-checkbox
      label="I have materials ready on how to report an exposure to or symptoms of COVID-19"
    ></v-checkbox>

    <h3 class="mb-1 mt-4">Meals Preparation: Practice safe food handling</h3>
    <p>All employers and employees must practice good food handling and hygiene practices.</p>
    <p>This includes safe food practices like protecting foods from contamination, minimizing direct handling of food and preventing cross contamination of foods.</p>
    <v-checkbox
      label="I have schedules in place for kitchen/eating areas to limit contact and maintain 2 metre physical distancing"
    ></v-checkbox>
    <v-checkbox
      label="Each employee has their own dishware, utensils and drinking cup"
    ></v-checkbox>
    <v-checkbox
      label="Used dishware will be washed immediately"
    ></v-checkbox>

    <hr>

    <v-btn color="primary" @click="setStep(5)">Go to Step 5</v-btn>
    <v-btn text @click="setStep(3)">Back</v-btn>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Step4',
  computed: {
  },
  methods: {
    ...mapMutations('form', ['setStep']),
  }
};
</script>


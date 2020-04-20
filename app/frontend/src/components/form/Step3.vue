<template>
  <v-container>
    <h2 class="pb-8">Before workers arrive at your farm</h2>

    <h3>Please certify:</h3>

    <v-checkbox
      label="I have downloaded and read Guidelines for Silviculture Worker Camps during the COVID-19 pandemic"
    ></v-checkbox>
    <v-checkbox label="I have completed a COVID-19 workplace risk assessment"></v-checkbox>
    <v-checkbox
      label="I have developed and will follow the Infection Prevention and Control (IPC) plan for COVID-19 exposure control plan"
    ></v-checkbox>

    <h3 class="mb-1 mt-4">COVID-19 Information</h3>

    <p>Silviculture/Planting operators need to make workers aware of the risks of COVID-19 and be prepared if workers have questions about COVID-19.</p>

    <v-checkbox
      label="I have signage in place in the appropriate language on how employees can protect themselves from COVID-19 "
    ></v-checkbox>
    <v-checkbox
      label="I have someone identified that workers can go to if they have questions on COVID-19"
    ></v-checkbox>
    <v-checkbox>
      <template v-slot:label>
        <div>
          I have contacted my local
          <a
            target="_blank"
            href="https://www2.gov.bc.ca/gov/content/health/about-bc-s-health-care-system/office-of-the-provincial-health-officer/medical-health-officers"
          >Vuetify</a> to alert them to the arrival of TFWs to the region
        </div>
      </template>
    </v-checkbox>

    <h3 class="mb-1 mt-4">Provide safe lodging and accommodation: General Worker</h3>

    <p>Silviculture/Planting operators must be able to provide accommodations that minimize crowding, social interactions, and provide sufficient physical distance (individual tents or beds 2m apart and head-to-toe in shared accommodations).</p>

    <v-checkbox label="Common areas allow physical distancing of 2m / 6ft at all times"></v-checkbox>

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


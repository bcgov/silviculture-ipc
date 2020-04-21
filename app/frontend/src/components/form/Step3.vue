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
          >Medical Health Officer</a> to alert them to the arrival of TFWs to the region
        </div>
      </template>
    </v-checkbox>

    <h3 class="mb-1 mt-4">Provide safe lodging and accommodation: General Worker</h3>

    <p>Silviculture/Planting operators must be able to provide accommodations that minimize crowding, social interactions, and provide sufficient physical distance (individual tents or beds 2m apart and head-to-toe in shared accommodations).</p>

    <v-checkbox label="Common areas allow physical distancing of 2m / 6ft at all times"></v-checkbox>

    <p>Do you have shared sleeping areas or single beds?</p>
    <div class="pl-4">
      <v-radio-group v-model="radios" :mandatory="true">
        <v-radio label="Individual Beds or Single beds" value="radio-1"></v-radio>
        <v-radio label="Shared sleeping areas" value="radio-2"></v-radio>
      </v-radio-group>

      <v-row no-gutters>
        <v-col cols="4" lg="3">
          <v-combobox :items="numbers" label="How many people are in a room?"></v-combobox>
        </v-col>
      </v-row>
      <v-checkbox label="Beds in the right configuration with the right distance apart"></v-checkbox>
    </div>

    <h3 class="mt-4">Self-isolation space if a worker comes down with COVID-19-like symptoms</h3>
    <v-checkbox label="I understand what is needed for a person to self-isolate."></v-checkbox>
    <v-checkbox
      label="I have the accommodation to let a worker self-isolate in a separate accommodation than other workers or arrange for separate accommodation."
    ></v-checkbox>

    <h3 class="mb-1 mt-4">Make sure laundry services are available and handled safely</h3>
    <p>Laundry must be performed properly to ensure the spread and transmission of COVID-19, including using hot water for laundry machines and having adequate supply of detergent.</p>
    <v-checkbox label="I have laundry services available for regular use"></v-checkbox>

    <h3 class="mb-1 mt-4">Practicing waste management: At work-site and accommodation</h3>
    <p>Proper collection and removal of garbage is crucial to reducing the risk of disease transmission. This includes wearing disposable gloves to remove waste from rooms and common areas and using sturdy, leak resistant garbage bags for containing waste.</p>
    <v-checkbox label="I have disposable gloves for the handling of garbage"></v-checkbox>
    <v-checkbox label="I have a waste removal schedule"></v-checkbox>
    <v-checkbox label="I have sturdy, leak resistant garbage bags"></v-checkbox>

    <h3 class="mb-1 mt-4">Have proper hand-washing facilities: At work-site and accommodation</h3>
    <p>Helping workers to engage in hand hygiene prevents or reduces the spread of COVID-19 and other illnesses. Siliculture/Planting operators should ensure easy access to hand hygiene facilities either through hand hygiene stations or the provisions of hand sanitizer at the work site and at the accommodation site.</p>
    <v-checkbox
      label="I have an adequate number of hand washing stations (either permanent or portable) available to workers"
    ></v-checkbox>
    <v-checkbox label="There is an appropriate supply of soap and water "></v-checkbox>
    <v-checkbox
      label="I have supplemented with waterless hand sanitizers with a min of 60% alcohol where appropriate"
    ></v-checkbox>
    <v-checkbox label="I have provided disposable paper towels"></v-checkbox>
    <v-checkbox label="I have put up signs to promote regular hand washing"></v-checkbox>

    <hr />

    <h3 class="mb-1 mt-4">Physical Distancing Practices</h3>
    <p>Keeping a 2 meter distance between people is one of the most important ways to break the chain of transmission of COVID-19. Silviculture/planting operators can take practical steps to ensure physical distancing is maintained while workers are transported to or from the work site, while working indoors or outdoors, during break times.</p>
    <p>Keeping a 2 meter distance between people is one of the most important ways to break the chain of transmission of COVID-19. Silviculture/planting operators can take practical steps to ensure physical distancing is maintained while workers are transported to or from the work site, while working indoors or outdoors, during break times.</p>
    <p>Physical barriers such as the use of plexi-glass, face shields, masks, and other techniques can be used where physical distancing is not possible.</p>
    <v-checkbox
      label="I have sleeping arrangements that maintains physical distancing or uses physical barriers"
    ></v-checkbox>
    <v-checkbox
      label="I have physical barriers like face shields or masks for situations where physical distancing is not possible."
    ></v-checkbox>

    <h3 class="mb-1 mt-4">Have a Cleaning and Disinfecting Schedule</h3>
    <p>All common areas and surfaces should be cleaned at the start and end of each day. Examples of common areas and surfaces include washrooms, common tables, desks, light switches, and door handles. Regular household cleaners are effective against COVID-19, following the instructions on the label.</p>
    <v-checkbox
      label="I have a schedule to ensure common and high touch areas are cleaned or disinfected at the start and end of each day"
    ></v-checkbox>

    <hr />

    <v-btn color="primary" @click="setStep(4)">Go to Step 4</v-btn>
    <v-btn text @click="setStep(2)">Back</v-btn>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Step3',
  data() {
    return {
      numbers: [1,2,3,4,5,6,7,8,9,10]
    };
  },
  computed: {
  },
  methods: {
    ...mapMutations('form', ['setStep']),
  }
};
</script>


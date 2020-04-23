<template>
  <v-container>
    <div class="hide-on-review">
      <h2 class="pb-8">Before you begin planting, please certify</h2>
      <hr class="orange" />
    </div>

   
    <h3 class="mb-1 mt-4">COVID-19 Information</h3>

    <p
      class="hide-on-review"
    >Silviculture/Planting operators need to make workers aware of the risks of COVID-19 and be prepared if workers have questions about COVID-19.</p>

    <v-checkbox
      v-model="protectionSignage"
      :readonly="reviewMode"
      label="I have signage in place in the appropriate language on how employees can protect themselves from COVID-19 "
    ></v-checkbox>
    <v-checkbox
      v-model="workerContactPersonnel"
      :readonly="reviewMode"
      label="I have someone identified that workers can go to if they have questions on COVID-19"
    ></v-checkbox>
    <v-checkbox v-model="mhoContacted" :readonly="reviewMode">
      <template v-slot:label>
        <div>
          I have contacted my local
          <a
            target="_blank"
            href="https://www2.gov.bc.ca/gov/content/health/about-bc-s-health-care-system/office-of-the-provincial-health-officer/medical-health-officers"
          >Medical Health Officer</a> to alert them to the arrival of planters to the region
        </div>
      </template>
    </v-checkbox>

    <h3 class="mb-1 mt-4">Provide safe lodging and accommodation: General Worker [section 12 of <em>the guidance</em>]</h3>

    <p
      class="hide-on-review"
    >Silviculture/Planting operators must be able to provide accommodations that minimize crowding, social interactions, and provide sufficient physical distance (individual tents or beds 2m apart and head-to-toe in shared accommodations).</p>

    <v-checkbox
      v-model="commonAreaDistancing"
      :readonly="reviewMode"
      label="Common areas allow physical distancing of 2m / 6ft at all times"
    ></v-checkbox>

    <p>Do you have individual/single beds or shared sleeping areas?</p>
    <div class="pl-4">
      <v-radio-group :readonly="reviewMode" v-model="sleepingAreaType" :mandatory="true">
        <v-radio label="Individual Beds or Single beds" value="1"></v-radio>
        <v-radio label="Shared sleeping areas" value="2"></v-radio>
      </v-radio-group>

      <div v-if="sleepingAreaType == 2">
        <v-row no-gutters>
          <v-col cols="4" lg="3">
            <v-combobox
              v-model="sharedSleepingPerRoom"
              :readonly="reviewMode"
              :items="numbers"
              label="How many people are in a room?"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-checkbox
          v-model="sharedSleepingDistancing"
          :readonly="reviewMode"
          label="Beds in the head-to-toe configuration with the 2m distance apart"
        ></v-checkbox>
      </div>
    </div>

    <h3 class="mt-4">Self-isolation space if a worker comes down with COVID-19-like symptoms</h3>
    <v-checkbox
      v-model="selfIsolateUnderstood"
      :readonly="reviewMode"
      label="I understand what is needed for a person to self-isolate."
    ></v-checkbox>
    <v-checkbox
      v-model="selfIsolateAccommodation"
      :readonly="reviewMode"
      label="I have the accommodation to let a worker self-isolate in a separate accommodation than other workers or arrange for separate accommodation."
    ></v-checkbox>

    <h3 class="mb-1 mt-4">Make sure laundry services are available and handled safely</h3>
    <p
      class="hide-on-review"
    >Laundry must be performed properly to reduce the risk of disease transmission of COVID-19, including using hot water for laundry machines and having adequate supply of detergent.</p>
    <v-checkbox
      v-model="laundryServices"
      :readonly="reviewMode"
      label="I have laundry services available for regular use"
    ></v-checkbox>

    <h3 class="mb-1 mt-4">Practicing waste management: At work-site and accommodation</h3>
    <p
      class="hide-on-review"
    >Proper collection and removal of garbage is crucial to reducing the risk of disease transmission. This includes wearing disposable gloves to remove waste from rooms and common areas and using sturdy, leak resistant garbage bags for containing waste.</p>
    <v-checkbox
      v-model="wasteManagementGloves"
      :readonly="reviewMode"
      label="I have disposable gloves for the handling of garbage"
    ></v-checkbox>
    <v-checkbox
      v-model="wasteManagementSchedule"
      :readonly="reviewMode"
      label="I have a waste removal schedule"
    ></v-checkbox>
    <v-checkbox
      v-model="wasteManagementBags"
      :readonly="reviewMode"
      label="I have sturdy, leak resistant garbage bags"
    ></v-checkbox>

    <h3 class="mb-1 mt-4">Have proper hand-washing facilities: At work-site and accommodation</h3>
    <p
      class="hide-on-review"
    >Helping workers to engage in hand hygiene prevents or reduces the spread of COVID-19 and other illnesses. Silviculture/Planting operators should ensure easy access to hand hygiene facilities either through hand hygiene stations or the provisions of hand sanitizer at the work site and at the accommodation site.</p>
    <v-checkbox
      v-model="handWashingStations"
      :readonly="reviewMode"
      label="I have an adequate number of hand washing stations (either permanent or portable) available to workers"
    ></v-checkbox>
    <v-checkbox
      v-model="handWashingSoapWater"
      :readonly="reviewMode"
      label="There is an appropriate supply of soap and water "
    ></v-checkbox>
    <v-checkbox
      v-model="handWashingWaterless"
      :readonly="reviewMode"
      label="I have supplemented with waterless hand sanitizers with a min of 60% alcohol where appropriate"
    ></v-checkbox>
    <v-checkbox
      v-model="handWashingPaperTowels"
      :readonly="reviewMode"
      label="I have provided disposable paper towels"
    ></v-checkbox>
    <v-checkbox
      v-model="handWashingSignage"
      :readonly="reviewMode"
      label="I have put up signs to promote regular hand washing"
    ></v-checkbox>

    <hr />

    <h3 class="mb-1 mt-4">Physical Distancing Practices</h3>
    <div class="hide-on-review">
      <p>Keeping a 2 meter distance between people is one of the most important ways to break the chain of transmission of COVID-19. Silviculture/planting operators can take practical steps to ensure physical distancing is maintained while workers are transported to or from the work site, while working indoors or outdoors, during break times.</p>
      <p>Physical barriers such as the use of plexi-glass, face shields, masks, and other techniques can be used where physical distancing is not possible.</p>
    </div>
    <v-checkbox
      v-model="distancingSleepingBarriers"
      :readonly="reviewMode"
      label="I have sleeping arrangements that maintains physical distancing or uses physical barriers"
    ></v-checkbox>
    <v-checkbox
      v-model="distancingFaceShields"
      :readonly="reviewMode"
      label="I have physical barriers like face shields or masks for situations where physical distancing is not possible."
    ></v-checkbox>

    <h3 class="mb-1 mt-4">Have a Cleaning and Disinfecting Schedule</h3>
    <p>All common areas and surfaces should be cleaned at the start and end of each day. Examples of common areas and surfaces include washrooms, common tables, desks, light switches, and door handles. Regular household cleaners are effective against COVID-19, following the instructions on the label.</p>
    <v-checkbox
      v-model="disinfectingSchedule"
      :readonly="reviewMode"
      label="I have a schedule to ensure common and high touch areas are cleaned or disinfected at the start and end of each day"
    ></v-checkbox>

    <div class="hide-on-review">
      <hr />

      <v-btn color="primary" @click="setStep(4)">Go to Step 4</v-btn>
      <v-btn text @click="setStep(2)">Back</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Step3',
  props: {
    reviewMode: Boolean
  },
  data() {
    return {
      numbers: [1,2,3,4,5,6,7,8,9,10]
    };
  },
  computed: {
    ...mapGetters('form', ['ipcPlan']),

    // COVID 19 info
    protectionSignage: {
      get() { return this.ipcPlan.protectionSignage; },
      set(value) { this.updateIpcPlan({['protectionSignage']: value}); }
    },
    workerContactPersonnel: {
      get() { return this.ipcPlan.workerContactPersonnel; },
      set(value) { this.updateIpcPlan({['workerContactPersonnel']: value}); }
    },
    mhoContacted: {
      get() { return this.ipcPlan.mhoContacted; },
      set(value) { this.updateIpcPlan({['mhoContacted']: value}); }
    },

    // Lodging
    commonAreaDistancing: {
      get() { return this.ipcPlan.commonAreaDistancing; },
      set(value) { this.updateIpcPlan({['commonAreaDistancing']: value}); }
    },
    sleepingAreaType: {
      get() { return this.ipcPlan.sleepingAreaType; },
      set(value) { this.updateIpcPlan({['sleepingAreaType']: value}); }
    },
    sharedSleepingPerRoom: {
      get() { return this.ipcPlan.sharedSleepingPerRoom; },
      set(value) { this.updateIpcPlan({['sharedSleepingPerRoom']: value}); }
    },
    sharedSleepingDistancing: {
      get() { return this.ipcPlan.sharedSleepingDistancing; },
      set(value) { this.updateIpcPlan({['sharedSleepingDistancing']: value}); }
    },

    // Self-isolation
    selfIsolateUnderstood: {
      get() { return this.ipcPlan.selfIsolateUnderstood; },
      set(value) { this.updateIpcPlan({['selfIsolateUnderstood']: value}); }
    },
    selfIsolateAccommodation: {
      get() { return this.ipcPlan.selfIsolateAccommodation; },
      set(value) { this.updateIpcPlan({['selfIsolateAccommodation']: value}); }
    },

    // Laundry
    laundryServices: {
      get() { return this.ipcPlan.laundryServices; },
      set(value) { this.updateIpcPlan({['laundryServices']: value}); }
    },

    // Waste mgmt
    wasteManagementGloves: {
      get() { return this.ipcPlan.wasteManagementGloves; },
      set(value) { this.updateIpcPlan({['wasteManagementGloves']: value}); }
    },
    wasteManagementSchedule: {
      get() { return this.ipcPlan.wasteManagementSchedule; },
      set(value) { this.updateIpcPlan({['wasteManagementSchedule']: value}); }
    },
    wasteManagementBags: {
      get() { return this.ipcPlan.wasteManagementBags; },
      set(value) { this.updateIpcPlan({['wasteManagementBags']: value}); }
    },

    // Hand-washing
    handWashingStations: {
      get() { return this.ipcPlan.handWashingStations; },
      set(value) { this.updateIpcPlan({['handWashingStations']: value}); }
    },
    handWashingSoapWater: {
      get() { return this.ipcPlan.handWashingSoapWater; },
      set(value) { this.updateIpcPlan({['handWashingSoapWater']: value}); }
    },
    handWashingWaterless: {
      get() { return this.ipcPlan.handWashingWaterless; },
      set(value) { this.updateIpcPlan({['handWashingWaterless']: value}); }
    },
    handWashingPaperTowels: {
      get() { return this.ipcPlan.handWashingPaperTowels; },
      set(value) { this.updateIpcPlan({['handWashingPaperTowels']: value}); }
    },
    handWashingSignage: {
      get() { return this.ipcPlan.handWashingSignage; },
      set(value) { this.updateIpcPlan({['handWashingSignage']: value}); }
    },


    // Phyisical Distancing
    distancingSleepingBarriers: {
      get() { return this.ipcPlan.distancingSleepingBarriers; },
      set(value) { this.updateIpcPlan({['distancingSleepingBarriers']: value}); }
    },
    distancingFaceShields: {
      get() { return this.ipcPlan.distancingFaceShields; },
      set(value) { this.updateIpcPlan({['distancingFaceShields']: value}); }
    },

    // Cleaning/Disinfecting
    disinfectingSchedule: {
      get() { return this.ipcPlan.disinfectingSchedule; },
      set(value) { this.updateIpcPlan({['disinfectingSchedule']: value}); }
    }
  },
  methods: {
    ...mapMutations('form', ['setStep', 'updateIpcPlan']),
  }
};
</script>


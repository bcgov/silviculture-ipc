<template>
  <v-container>
    <div class="hide-on-review">
      <h2 class="pb-8">If workers become ill at the farm</h2>
      <hr class="orange" />
    </div>

    <h3>Provide safe lodging and accommodation: Self-Isolation</h3>Questions here TBD?? Not on word doc
    <h3 class="mb-1 mt-4">Plan to manage individuals with suspected COVID-19 Infection</h3>
    <p class="hide-on-review">
      Silviculture/planting operators must have a plan and protocol to deal with workers demonstrating symptoms of COVID-19, including immediate self isolation of the worker and notifying the local health authority. If two or more workers become sick, you must notify the local
      <a
        target="_blank"
        href="https://www2.gov.bc.ca/gov/content/health/about-bc-s-health-care-system/office-of-the-provincial-health-officer/medical-health-officers"
      >Medical Health Officer</a> of the outbreak.
    </p>
    <v-checkbox
      v-model="infectionSeparation"
      :readonly="reviewMode"
      label="I am prepared to promptly separate the individual from others in their own accommodation"
    ></v-checkbox>
    <v-checkbox
      v-model="infectionSymptoms"
      :readonly="reviewMode"
      label="I am prepared to provide individuals exhibiting symptoms of COVID-19 with a surgical/procedural mask or tissues to cover their mouth and nose."
    ></v-checkbox>
    <v-checkbox
      v-model="infectionHeathLinkBC"
      :readonly="reviewMode"
      label="I am prepared to direct the person to call  HealthLinkBC (8-1-1)."
    ></v-checkbox>
    <v-checkbox
      v-model="infectionSanitization"
      :readonly="reviewMode"
      label="I am prepared to clean and disinfect any rooms that the person has been in while symptomatic."
    ></v-checkbox>

    <v-card outlined class="my-6 silv-warning-card hide-on-review">
      <v-card-text>
        <v-container>
          <v-row no-gutters>
            <v-col cols="12" sm="1">
              <h1>
                <v-icon large>warning</v-icon>
              </h1>
            </v-col>
            <v-col cols="12" sm="11">
              As COVID-19 recommendations are evolving daily, please keep up to date with
              <a
                target="_blank"
                href="http://www.bccdc.ca/health-info/diseases-conditions/covid-19/about-covid-19"
              >BC Centre for Disease Control</a> guidance.
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <h3 class="mb-1 mt-8">Providing Food for Ill Workers</h3>
    <v-checkbox
      v-model="infectedFeeding"
      :readonly="reviewMode"
      label="I am able to provide food in a safe manner to a self-isolated worker"
    ></v-checkbox>
    <v-card outlined class="silv-info-card hide-on-review">
      <v-card-title>
        <v-icon>play_circle_filled</v-icon>What does this mean?
      </v-card-title>
      <v-card-text>
        <ul>
          <li>Gloves are not required when delivering or picking up food trays.</li>
          <li>Proper hand hygiene must be practiced before delivering and after picking up food trays.</li>
          <li>Do NOT enter a room to deliver or pick up food trays for workers who are ill. Deliver and pick up food trays from outside their accommodation.</li>
        </ul>
      </v-card-text>
    </v-card>

    <h3 class="mb-1 mt-8">Housekeeping for Ill Workers</h3>
    <v-checkbox
      v-model="infectedHousekeeping"
      :readonly="reviewMode"
      label="I am able to perform adequate housekeeping for a self isolated worker"
    ></v-checkbox>
    <v-card outlined class="silv-info-card hide-on-review">
      <v-card-title>
        <v-icon>play_circle_filled</v-icon>What does this mean?
      </v-card-title>
      <v-card-text>
        <ul>
          <li>Site operators must identify and record the locations of all self-isolating guests.</li>
          <li>Do NOT provide cleaning service inside rooms or tents where people are in self-isolation.</li>
          <li>Ensure staff do NOT enter self-isolation rooms or tents until authorized.</li>
          <li>Use alternate means of assisting workers in isolation, such as leaving fresh linens, toiletries and cleaning supplies outside their accommodation during the period of isolation.</li>
          <li>Once the individual(s) in self-isolation have left their accommodation, complete a thorough cleaning of all hard surfaces with an approved disinfectant, launder all removable cloth items (sheets, towels).</li>
          <li>Discard all personal soap and shampoo remnants.</li>
        </ul>
      </v-card-text>
    </v-card>

    <h3 class="mb-1 mt-8">Waste Management for Ill Workers</h3>
    <v-checkbox
      v-model="infectedWaste"
      :readonly="reviewMode"
      label="I am able to perform waste management for supporting a self-isolated worker"
    ></v-checkbox>
    <v-card outlined class="silv-info-card hide-on-review">
      <v-card-title>
        <v-icon>play_circle_filled</v-icon>What does this mean?
      </v-card-title>
      <v-card-text>
        <ul>
          <li>Wherever possible, waste from all self-isolation rooms or tents should be handled by a designated person or small, designated team.</li>
        </ul>
      </v-card-text>
    </v-card>

    <div class="hide-on-review">
      <hr class="mt-5" />

      <v-btn color="primary" @click="setStep(6)">Go to Step 6</v-btn>
      <v-btn text @click="setStep(4)">Back</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Step5',
  props: {
    reviewMode: Boolean
  },
  computed: {
    ...mapGetters('form', ['ipcPlan']),

    // Safe Lodging
    //TBD??

    // Infection
    infectionSeparation: {
      get() { return this.ipcPlan.infectionSeparation; },
      set(value) { this.updateIpcPlan({['infectionSeparation']: value}); }
    },
    infectionSymptoms: {
      get() { return this.ipcPlan.infectionSymptoms; },
      set(value) { this.updateIpcPlan({['infectionSymptoms']: value}); }
    },
    infectionHeathLinkBC: {
      get() { return this.ipcPlan.infectionHeathLinkBC; },
      set(value) { this.updateIpcPlan({['infectionHeathLinkBC']: value}); }
    },
    infectionSanitization: {
      get() { return this.ipcPlan.infectionSanitization; },
      set(value) { this.updateIpcPlan({['infectionSanitization']: value}); }
    },

    // Food
    infectedFeeding: {
      get() { return this.ipcPlan.infectedFeeding; },
      set(value) { this.updateIpcPlan({['infectedFeeding']: value}); }
    },

    // HouseKeeping
    infectedHousekeeping: {
      get() { return this.ipcPlan.infectedHousekeeping; },
      set(value) { this.updateIpcPlan({['infectedHousekeeping']: value}); }
    },

    // Waste
    infectedWaste: {
      get() { return this.ipcPlan.infectedWaste; },
      set(value) { this.updateIpcPlan({['infectedWaste']: value}); }
    },
  },
  methods: {
    ...mapMutations('form', ['setStep', 'updateIpcPlan']),
  }
};
</script>


<template>
  <v-container>
    <div class="hide-on-review">
      <h2 class="mb-8">Protect employees, contractors, and employers, during the COVID-19 pandemic</h2>
      <p
        class="mb-8"
      >The Province of British Columbia has initiated emergency measures to slow the spread of COVID-19. Forestry Sector operators must ensure a safe workplace for their workers and demonstrate proof of an Infection Prevention Control protocol (IPCP).</p>

      <BaseWarningCard class="my-6">
        <h3>This attestation form must be completed once for each accommodation location.</h3>
      </BaseWarningCard>

      <h2 class="mb-8 mt-12">
        <strong>Before you complete this form:</strong>
      </h2>

      <hr class="orange" />
    </div>

    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="2" lg="1" class="hide-on-review">
          <v-avatar color="#003366" size="50">
            <span class="white--text headline">1</span>
          </v-avatar>
        </v-col>
        <v-col cols="12" sm="10" lg="11">
          <h4 class="mb-4">
            <strong>
              Read
              <em>{{ docTitle }}</em>
            </strong>
          </h4>
          <p>
            <a
              href="https://www2.gov.bc.ca/assets/gov/health/about-bc-s-health-care-system/office-of-the-provincial-health-officer/covid-19/covid-19-pho-guidance-work-camps-silviculture.pdf"
              target="_blank"
            >Download PDF</a>
          </p>
        </v-col>
      </v-row>
    </v-container>

    <div class="hide-on-review">
      <hr />
      <v-container class="mb-4">
        <v-row no-gutters>
          <v-col cols="12" sm="2" lg="1" class="hide-on-review">
            <v-avatar color="#003366" size="50">
              <span class="white--text headline">2</span>
            </v-avatar>
          </v-col>
          <v-col cols="12" sm="10" lg="11">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <strong>Complete a COVID-19 risk assessment of your forestry camps by following the directions in the guidance document.</strong>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p>
                    Assessing each section in
                    <em>{{ docShortTitle }}</em> will help you identify areas that do not sufficiently prevent or reduce the risk of COVID-19 transmission.
                  </p>

                  <BaseInfoCard>
                    <p>
                      <strong>For example,</strong> if workers need to be transported to the work site in vehicles where a 2m distance cannot be maintained, this should be identified as a risk.
                    </p>
                    <p
                      class="mb-0"
                    >Forestry Sector operators can take practical actions to reduce the risk of disease transmission (see section 7).</p>
                  </BaseInfoCard>

                  <p class="mt-5">
                    Have you worked through all the sections in
                    <em>{{ docShortTitle }}</em> to identify the risks at your camps?
                  </p>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>

      <hr />
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" sm="2" lg="1" class="hide-on-review">
            <v-avatar color="#003366" size="50">
              <span class="white--text headline">3</span>
            </v-avatar>
          </v-col>
          <v-col cols="12" sm="10" lg="11">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <strong>Create your Infection Prevention and Control protocol.</strong>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p>
                    By following the guidance in
                    <em>{{ docShortTitle }}</em>, you will be developing an Infection Prevention and Control (IPC) Protocol.
                  </p>
                  <p>For each section of the guide you identified a risk, the risk needs to be controlled. For example, if your workers ride together in a vehicle to the work site, and you follow the instructions to increase cleaning and hygiene, and increase physical distancing, this will form your IPC plan for transportation (see section 7).</p>
                  <p>
                    Have you decided what guidance in
                    <em>{{ docShortTitle }}</em> is needed in your camps to prevent or control the risk of the transmission of COVID-19?
                  </p>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="hide-on-review">
      <div class="my-12">
        <BaseInfoCard class="pt-3">
          <p>
            If you need assistance completing these risk assessment or infection prevention tasks, please email
            <strong>FP.Engagement@gov.bc.ca</strong>
          </p>
        </BaseInfoCard>
      </div>

      <h3 class="mb-2">After submitting this form, you will be subject to a site inspection:</h3>
      <ul class="pl-12">
        <li>The Province of BC will use the information you provide through this online form for the site inspection that determines your compliance with the COVID-19 Industrial Camps Provincial Health Order.</li>
      </ul>

      <BaseWarningCard class="my-6">
        <h3>If you fail to comply with these requirements, the Provincial Health Officer order enables the authority to take enforcement action against you under Part 4, Division 6 of the Public Health Act.</h3>
      </BaseWarningCard>
    </div>

    <!-- operation type -->
    <v-form ref="form">
      <div class="d-sm-flex flex-row">
        <div class="pt-sm-7 pr-sm-5 pb-0">Please select your Operation Type:</div>
        <div class="pt-sm-5 pb-0">
          <v-select
            :items="operationTypes"
            item-text="display"
            item-value="type"
            v-model="opType"
            :rules="[v => !!v || 'Operation Type is required']"
            dense
            flat
            outlined
            solo
            single-line
          />
        </div>
      </div>
      <div class="my-6 hide-on-review">
        <v-btn class="px-12" color="primary" @click="setStep(2)">Go to Step 2</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Step1',
  data() {
    return {
      docTitle: 'Protecting Employees, Contractors, and Employers Working ... During the COVID-19 Pandemic.',
      docShortTitle: 'COVID-19 Guidelines for Forestry Sector Work Camps.',
      operationTypes: [
        { type:'BRUSHING', display: 'Brushing', enabled: true },
        { type:'CONE_PICKING', display: 'Cone Picking', enabled: true },
        { type:'ENGINEERING', display: 'Engineering', enabled: true },
        { type:'LAYOUT', display: 'Layout/Timber Cruising', enabled: true },
        { type:'LOGGING', display: 'Logging', enabled: true },
        { type:'PRUNING', display: 'Pruning', enabled: true },
        { type:'RESEARCH', display: 'Research', enabled: true },
        { type:'SILVICULTURE', display: 'Silviculture', enabled: true },
        { type:'SPACING', display: 'Spacing', enabled: true },
        { type:'SURVEYING', display: 'Surveying', enabled: true },
        { type:'VEGETATION_MANAGEMENT', display: 'Vegetation Management', enabled: true },
        { type:'WILDFIRE_CAMPS', display: 'Wildfire Camps', enabled: true },
        { type:'OTHER', display: 'Other', enabled: true }
      ]
    };
  },
  computed: {
    ...mapGetters('form', ['operationType']),
    opType: {
      get() { return this.operationType; },
      set(value) { this.setOperationType(value); }
    }
  },
  methods: {
    ...mapMutations('form', ['setStep', 'setOperationType']),
  }
};
</script>


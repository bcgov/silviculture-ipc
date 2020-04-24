<template>
  <v-container>
    <div class="hide-on-review">
      <h2
        class="mb-8"
      >Protect silviculture employees, contractors, and employers, during the COVID-19 pandemic</h2>
      <p
        class="mb-8"
      >The Province of British Columbia has initiated emergency measures to slow the spread of COVID-19. Silviculture and Planting operators must ensure a safe workplace for their workers and demonstrate proof of an Infection Prevention Control protocol (IPCP).</p>

      <v-card outlined class="my-6 silv-warning-card">
        <v-card-text>
          <v-container>
            <v-row no-gutters>
              <v-col cols="12" sm="1">
                <h1>
                  <v-icon large>warning</v-icon>
                </h1>
              </v-col>
              <v-col cols="12" sm="11">
                <h3>This attestation form must be completed once for each planting operation.</h3>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>

      <p class="mb-8">
        <strong>Before you complete this form:</strong>
      </p>

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
          <p>
            <strong>
              Read
              <em>Protecting Employees, Contractors, and Employers Working in the Silviculture Sector During the COVID-19 Pandemic.</em>
            </strong>
          </p>
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
      <v-container>
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
                  <strong>Complete a COVID-19 risk assessment of your silviculture camps by following the directions in the guidance document.</strong>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p>
                    Assessing each section in the
                    <em>Guidelines for Silviculture Worker Camps during the COVID-19 Pandemic</em> will help you identify areas that do not sufficiently prevent or reduce the risk of COVID-19 transmission.
                  </p>
                  <p>For example, if workers need to be transported to the work site in vehicles where a 2m distance cannot be maintained, this should be identified as a risk. Silviculture and Planting operators can take practical actions to reduce the risk of disease transmission (see section 7).</p>
                  <p>
                    Have you worked through all the sections in
                    <em>Guidelines for Silviculture Worker Camps during the COVID-19 pandemic</em> to identify the risks at your camps?
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
                    <em>Guidelines for Silviculture Worker Camps during the COVID-19 pandemic</em>, you will be developing an Infection Prevention and Control (IPC) Protocol.
                  </p>
                  <p>For each section of the guide you identified a risk, the risk needs to be controlled. For example, if your workers ride together in a vehicle to the work site, and you follow the instructions to increase cleaning and hygiene, and increase physical distancing, this will form your IPC plan for transportation (see section 7).</p>
                  <p>
                    Have you decided what guidance in
                    <em>Guidelines for Silviculture Worker Camps during the COVID-19 pandemic</em> is needed in your camps to prevent or control the risk of the transmission of COVID-19?
                  </p>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="hide-on-review">
      <hr class="orange" />
      <v-card outlined class="my-6 silv-contact-card">
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12" sm="1">
              <h1>
                <v-icon large>phone</v-icon>
              </h1>
            </v-col>
            <v-col cols="12" sm="11">
              <h3>If you need assistance completing these risk assessment or infection prevention tasks, please contact the FLNRO Contact (toll free 1-888-xxx-xxxx) for help.</h3>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <h3 class="mb-2">After submitting this form, you will be subject to a site inspection:</h3>
      <ul class="pl-12">
        <li>The Province of BC will use the information you provide through this online form for the site inspection that determines your compliance with the COVID-19 Industrial Camps Provincial Health Order.</li>
      </ul>

      <v-card outlined class="my-6 silv-warning-card">
        <v-card-text>
          <v-container>
            <v-row no-gutters>
              <v-col cols="12" sm="1">
                <h1>
                  <v-icon large>warning</v-icon>
                </h1>
              </v-col>
              <v-col cols="12" sm="11">
                <h3>If you fail to comply with these requirements, the Provincial Health Officer order enables the authority to take enforcement action against you under Part 4, Division 6 of the Public Health Act.</h3>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>

      <hr />

      <v-btn color="primary" @click="setStep(2)">Go to Step 2</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Step1',
  computed: {
  },
  methods: {
    ...mapMutations('form', ['setStep']),
  }
};
</script>


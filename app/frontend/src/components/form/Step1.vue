<template>
  <v-container>
    <h2 class="mb-8">Apply for permission to protect workers during the COVID-19 pandemic</h2>
    <p
      class="mb-8"
    >The Government of Canada and Province of British Columbia have initiated emergency measures to slow the spread of COVID-19. Silviculture and Planting operators must ensure a safe workplace for their workers and demonstrate proof of an Infection Prevention Control Plan.</p>

    <p class="mb-8">
      <strong>Before you complete this form:</strong>
    </p>

    <hr class="orange" />
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="2" lg="1">
          <v-avatar color="#003366" size="62">
            <span class="white--text headline">1</span>
          </v-avatar>
        </v-col>
        <v-col cols="12" sm="10" lg="11">
          <p>
            Read
            <em>Protecting planters and silviculture workers during the COVID-19 pandemic.</em>
          </p>
          <p>
            <a href="https://www.google.com" target="_blank">Download PDF</a>
          </p>
        </v-col>
      </v-row>
    </v-container>

    <hr />
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="2" lg="1">
          <v-avatar color="#003366" size="62">
            <span class="white--text headline">2</span>
          </v-avatar>
        </v-col>
        <v-col cols="12" sm="10" lg="11">
          <p>Based on the guidance document, copmplete a silviculture camp risk assessment.</p>
          <p>Complete a COVID-19 risk assessment silviculture or planting operation. This is mandatory.</p>

          <p>
            Assessing each section in the
            <em>Guidelines for Silviculture Worker Camps during the COVID-19 Pandemic</em> will help you identify areas that do not sufficiently prevent or reduce the risk of COVID-19 transmission.
          </p>
          <p>For example, if workers need to be transported to the work site in vehicles where a 2m distance cannot be maintained, this should be identified as a risk. Silviculture and Planting operators can take practical actions to reduce the risk of disease transmission (see section 7).</p>
          <p>Have you worked through all the sections in Guidelines for Silviculture Worker Camps during the COVID-19 pandemic to identify the risks at your farm?</p>

          <v-card outlined class="silv-info-card">
            <v-card-title>
              <v-icon>play_circle_filled</v-icon>What is workplace risk assessment?
            </v-card-title>
            <v-card-text>
              If you need help doing a COVID-19 workplace risk assessment, read the
              <a
                href="https://www.google.com"
                target="_blank"
              >Government of Canada’s resource guide on how to make risk-informed decisions during the COVID-19 pandemic.</a>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <hr />
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="2" lg="1">
          <v-avatar color="#003366" size="62">
            <span class="white--text headline">3</span>
          </v-avatar>
        </v-col>
        <v-col cols="12" sm="10" lg="11">
          <p>
            Infection Prevention and Control Plan. By following the guidance in
            <em>Guidelines for Silviculture Worker Camps during the COVID-19 pandemic</em>, you will be developing an Infection Prevention and Control (IPC) Plan.
          </p>
          <p>For each section of the guide you identified a risk, the risk needs to be controlled. For example, if your workers ride together in a vehicle to the work site, and you follow the instructions to increase cleaning and hygiene, and increase physical distancing, this will form your IPC plan for transportation (see section 7).</p>
          <p>
            Have you decided what guidance in
            <em>Guidelines for Silviculture Worker Camps during the COVID-19 pandemic</em> is needed on your farm to prevent or control the risk of the transmission of COVID-19?
          </p>
        </v-col>
      </v-row>
    </v-container>

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
            <h3>If you need assistance completing these tasks, please contact the Ministry of Ministry name: Forests, Lands, Natural Resource Operations & Rural Development (toll free 1-888-xxx-xxxx) for help.</h3>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <p>Your IPC plan must be submitted to XXXX. A follow up inspection of your operation will be evaluated based on your IPC plan.</p>

    <h3 class="mb-2">After submitting this form, farm operators can expect:</h3>
    <ul class="pl-12">
      <li>You will be subject to a site inspection of the farm prior to the release of temporary foreign workers after their 14 day self isolation period.</li>
      <li>The Province of BC will use the IPC plan you provide through this online form for the site inspection that determines your compliance and readiness to receive workers.</li>
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
              <h3>If you fail to comply with these requirements, the arrival of silviculture workers or planters at your work site will be delayed and/or denied / prohibited.</h3>(source: BC Ministry of Health, Provincial Health Officer Order, PHO supplemental / Apr 13, date)
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <hr />

    <v-btn color="primary" @click="setStep(2)">Go to Step 2</v-btn>
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


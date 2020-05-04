<template>
  <v-container class="ipc-wrapper">
    <v-progress-linear v-if="gettingForm" color="primary"></v-progress-linear>
    <div v-else>
      <v-card outlined class="review-form">
        <h2 class="review-heading">Contact Information</h2>
        <Step2 :reviewMode="true" />
      </v-card>

      <v-card outlined class="review-form">
        <h2 class="review-heading">Before Workers Arrive</h2>
        <Step3 :reviewMode="true" />
      </v-card>

      <v-card outlined class="review-form">
        <h2 class="review-heading">After Workers Arrive</h2>
        <Step4 :reviewMode="true" />
      </v-card>

      <v-card outlined class="review-form">
        <h2 class="review-heading">If Workers Become Ill</h2>
        <Step5 :reviewMode="true" />
      </v-card>

      <v-card outlined class="review-form">
        <h2 class="review-heading mb-5">Certification</h2>
        <div class="pl-7">
          <v-checkbox
            readonly
            v-model="certifyAccurateInformation"
            label="I certify this information to be accurate"
          ></v-checkbox>
          <v-checkbox
            readonly
            v-model="agreeToInspection"
            label="I agree that my planting camps will be subject to a site inspection"
          ></v-checkbox>
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

import Step2 from '@/components/form/Step2.vue';
import Step3 from '@/components/form/Step3.vue';
import Step4 from '@/components/form/Step4.vue';
import Step5 from '@/components/form/Step5.vue';

export default {
  name: 'ReviewSubmission',
  components: {
    Step2,
    Step3,
    Step4,
    Step5
  },
  computed: {
    ...mapGetters('form', ['gettingForm', 'ipcPlan', 'submissionComplete']),
    // Certify checkboxes
    certifyAccurateInformation() { return this.ipcPlan.certifyAccurateInformation; },
    agreeToInspection() { return this.ipcPlan.agreeToInspection; }
  },
  mounted() {
    document.querySelectorAll('.review-form input, .review-form .v-select').forEach(q => {
      q.setAttribute('readonly', 'true');
      q.style.pointerEvents = 'none';
    });
  }
};
</script>

<style scoped lang="scss">
.review-form {
  font-size: smaller;
  margin-bottom: 2em;
  padding: 1em;
  .review-heading {
    margin-left: 0.5em;
    margin-bottom: em;
    color: #003366;
  }
  &::v-deep {
    .hide-on-review {
      display: none;
    }

    h3 {
      margin-top: 0.2em !important;
    }
    .heading-field-label {
      font-size: normal;
    }

    .v-input__slot {
      padding-left: 0 !important;
      input {
        padding-top: 0;
      }
    }
    .v-input__icon,
    .v-text-field__details {
      display: none;
    }
    fieldset {
      border: 0;
    }
    input::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: white;
    }
    input::-moz-placeholder {
      /* Firefox 19+ */
      color: white;
    }

    .v-input--checkbox,
    .v-input--radio-group__input {
      margin-top: 0;
      padding-top: 0;
      label {
        font-size: 14px;
      }
    }

    .question-series {
      p {
        font-size: 14px;
      }
      .questions {
        .v-input__slot {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>

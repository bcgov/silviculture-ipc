<template>
  <v-container class="ipc-wrapper">
    <v-progress-linear v-if="gettingForm" color="primary"></v-progress-linear>
    <div v-else>
      <v-card outlined class="review-form">
        <h2 class="review-heading">
          Contact Information
          <v-btn
            v-if="!submissionComplete"
            color="primary"
            class="mx-5"
            fab
            x-small
            @click="setStep(2)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </h2>
        <Step2 :reviewMode="true" />
      </v-card>

      <v-card outlined class="review-form">
        <h2 class="review-heading">
          Before Workers Arrive
          <v-btn
            v-if="!submissionComplete"
            color="primary"
            class="mx-5"
            fab
            x-small
            @click="setStep(3)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </h2>
        <Step3 :reviewMode="true" />
      </v-card>

      <v-card outlined class="review-form">
        <h2 class="review-heading">
          After Workers Arrive
          <v-btn
            v-if="!submissionComplete"
            color="primary"
            class="mx-5"
            fab
            x-small
            @click="setStep(4)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </h2>
        <Step4 :reviewMode="true" />
      </v-card>

      <v-card outlined class="review-form">
        <h2 class="review-heading">
          If Workers Become Ill
          <v-btn
            v-if="!submissionComplete"
            color="primary"
            class="mx-5"
            fab
            x-small
            @click="setStep(5)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </h2>
        <Step5 :reviewMode="true" />
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
  }
  &::v-deep {
    h3,
    .v-input--checkbox {
      margin-top: 0.2em !important;
    }
    .hide-on-review {
      display: none;
    }
    .v-input__slot {
      padding-left: 0 !important;
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
  }
}
</style>

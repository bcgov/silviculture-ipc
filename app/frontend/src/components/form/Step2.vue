<template>
  <v-container>
    <h2 class="pb-8">Provide your business contact information</h2>
    <hr class="orange" />

    <v-container>
      <v-form v-model="step2Valid">
        <v-row>
          <v-col cols="12" lg="8">
            <h4 class="mb-1 silv-required">Registered Business Name</h4>
            <v-text-field dense outlined flat solo :rules="businessNameRules" />
          </v-col>
        </v-row>

        <h4>Primary Contact</h4>
        <v-row>
          <v-col cols="12" sm="6" lg="4">
            <label class="silv-required">First Name</label>
            <v-text-field dense flat outlined solo :rules="firstNameRules" />
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <label class="silv-required">Last Name</label>
            <v-text-field dense flat outlined solo :rules="lastNameRules" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="4">
            <label class="silv-required">Phone Number</label>
            <v-text-field dense flat outlined solo :rules="phone1Rules" prepend-inner-icon="phone" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="4">
            <label>Phone Number (Secondary Contact)</label>
            <v-text-field dense flat outlined solo prepend-inner-icon="phone" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="4">
            <label class="silv-required">e-mail Address (Primary Contact)</label>
            <v-text-field dense flat outlined solo :rules="emailRules" prepend-inner-icon="email" />
          </v-col>
        </v-row>
      </v-form>
    </v-container>

    <hr />

    <v-btn color="primary" :disabled="!step2Valid" @click="setStep(3)">Go to Step 3</v-btn>
    <v-btn text @click="setStep(1)">Back</v-btn>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Step2',
  data() {
    return {
      step2Valid: false,
      businessNameRules: [
        v => !!v || 'Business name is required',
        v => (v && v.length <= 100) || 'Business name must be less than 100? characters',
      ],
      firstNameRules: [
        v => !!v || 'First name is required',
        v => (v && v.length <= 100) || 'First name must be less than 100? characters',
      ],
      lastNameRules: [
        v => !!v || 'Last name is required',
        v => (v && v.length <= 100) || 'Last name must be less than 100? characters',
      ],
      phone1Rules: [
        v => !!v || 'Phone number is required'
      ],
      emailRules: [
        v => !!v || 'e-mail is required',
        v => /.+@.+\..+/.test(v) || 'e-mail must be valid',
        v => (v && v.length <= 100) || 'e-mail must be less than 100? characters',
      ],
    };
  },
  computed: {
  },
  methods: {
    ...mapMutations('form', ['setStep']),
  }
};
</script>


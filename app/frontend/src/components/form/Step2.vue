<template>
  <v-container>
    <div class="hide-on-review">
      <h2 class="pb-8">Provide your business contact information</h2>
      <hr class="orange" />
    </div>

    <v-container>
      <v-form v-model="step2Valid">
        <v-row>
          <v-col cols="12" lg="8">
            <h4 class="mb-1">Registered Business Name</h4>
            <v-text-field
              dense
              outlined
              flat
              solo
              v-model="businessName"
              :rules="businessNameRules"
            />
          </v-col>
        </v-row>

        <h4>Primary Contact</h4>
        <v-row>
          <v-col cols="12" sm="6" lg="4">
            <label>First Name</label>
            <v-text-field dense flat outlined solo v-model="firstName" :rules="firstNameRules" />
          </v-col>
          <v-col cols="12" sm="6" lg="4">
            <label>Last Name</label>
            <v-text-field dense flat outlined solo v-model="lastName" :rules="lastNameRules" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="4">
            <label>Phone Number</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              :rules="phone1Rules"
              prepend-inner-icon="phone"
              v-model="phone1"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="4">
            <label>
              Phone Number (Secondary Contact)
              <small>- optional</small>
            </label>
            <v-text-field dense flat outlined solo prepend-inner-icon="phone" v-model="phone2" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="4">
            <label>e-mail Address (Primary Contact)</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              :rules="emailRules"
              prepend-inner-icon="email"
              v-model="email"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-container>

    <div class="hide-on-review">
      <hr />

      <v-btn color="primary" :disabled="!step2Valid" @click="setStep(3)">Go to Step 3</v-btn>
      <v-btn text @click="setStep(1)">Back</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Step2',
  props: ['reviewMode'],
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
    ...mapGetters('form', ['business', 'contacts']),
    businessName: {
      get() { return this.business.name; },
      set(value) { this.updateBusiness({['name']: value}); }
    },
    firstName: {
      get() { return this.contacts.firstName; },
      set(value) { this.updateContacts({['firstName']: value}); }
    },
    lastName: {
      get() { return this.contacts.lastName; },
      set(value) { this.updateContacts({['lastName']: value}); }
    },
    phone1: {
      get() { return this.contacts.phone1; },
      set(value) { this.updateContacts({['phone1']: value}); }
    },
    phone2: {
      get() { return this.contacts.phone2; },
      set(value) { this.updateContacts({['phone2']: value}); }
    },
    email: {
      get() { return this.contacts.email; },
      set(value) { this.updateContacts({['email']: value}); }
    },
  },
  methods: {
    ...mapMutations('form', ['setStep', 'updateBusiness', 'updateContacts']),
  }
};
</script>


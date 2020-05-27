<template>
  <v-container>
    <div class="hide-on-review">
      <h2 class="pb-8">Provide your business contact information</h2>
      <hr class="orange" />
    </div>
    <v-form ref="form" v-model="step2Valid">
      <v-container>
        <v-row>
          <v-col cols="12" lg="10">
            <h4 class="heading-field-label mb-1">Registered Business Name</h4>
            <OrgBookSearch
              v-if="!reviewMode"
              :field-model.sync="businessName"
              :field-rules="businessNameRules"
            />
            <v-text-field
              v-if="reviewMode"
              dense
              flat
              outlined
              solo
              v-model="businessName"
              :rules="businessNameRules"
            />
          </v-col>
        </v-row>

        <hr />

        <h4>Primary Contact</h4>
        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>First Name</label>
            <v-text-field dense flat outlined solo v-model="firstName" :rules="firstNameRules" />
          </v-col>
          <v-col cols="12" sm="6" lg="5">
            <label>Last Name</label>
            <v-text-field dense flat outlined solo v-model="lastName" :rules="lastNameRules" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>Phone Number</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              placeholder="000-000-0000"
              :rules="phone1Rules"
              prepend-inner-icon="phone"
              v-model="phone1"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="5">
            <label>Alternative Phone Number (Optional)</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              placeholder="000-000-0000"
              prepend-inner-icon="phone"
              v-model="phone2"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>E-mail Address (Primary Contact)</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              placeholder="john.doe@example.com"
              :rules="emailRules"
              prepend-inner-icon="email"
              v-model="email"
            />
          </v-col>
        </v-row>

        <hr />

        <h4>Business Address</h4>
        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>Address line 1</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="businessAddressLine1"
              :rules="businessAddressLine1Rules"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="5">
            <label>Address line 2 (Optional)</label>
            <v-text-field dense flat outlined solo v-model="businessAddressLine2" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>City</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="businessAddressCity"
              :rules="businessAddressCityRules"
            />
          </v-col>
          <v-col cols="12" sm="3" lg="2">
            <label>Province</label>
            <v-select
              :items="provinces"
              dense
              flat
              outlined
              solo
              single-line
              label="Select"
              v-model="businessAddressProvince"
              :rules="businessAddressProvinceRules"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="3" lg="2">
            <label>Postal Code</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="businessAddressPostalCode"
              :rules="businessAddressPostalCodeRules"
            />
          </v-col>
        </v-row>

        <hr />

        <h4>COVID-19 Coordinator</h4>
        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>First Name</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="covidFirstName"
              :rules="covidFirstNameRules"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="5">
            <label>Last Name</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="covidLastName"
              :rules="covidLastNameRules"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>Phone Number</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              placeholder="000-000-0000"
              prepend-inner-icon="phone"
              v-model="covidPhone1"
              :rules="covidPhone1Rules"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="5">
            <label>Alternative Phone Number (Optional)</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              placeholder="000-000-0000"
              prepend-inner-icon="phone"
              v-model="covidPhone2"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>E-mail Address (Primary Contact)</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              placeholder="john.doe@example.com"
              prepend-inner-icon="email"
              v-model="covidEmail"
              :rules="covidEmailRules"
            />
          </v-col>
        </v-row>
      </v-container>
      <hr class="mb-0"/>

      <!-- child Location form component -->
      <Location :reviewMode="reviewMode" />
    </v-form>

    <div class="hide-on-review">
      <hr />
      <v-btn color="primary" @click="submit">Go to Step 3</v-btn>
      <v-btn text @click="setStep(1)">Back</v-btn>
    </div>
  </v-container>
</template>

<script>
import validator from 'validator';
import { mapGetters, mapMutations } from 'vuex';

import OrgBookSearch from '@/components/form/OrgBookSearch.vue';
import Location from '@/components/form/Location.vue';

export default {
  name: 'Step2',
  props: {
    reviewMode: Boolean
  },
  components: {
    OrgBookSearch,
    Location
  },
  data() {
    return {
      step2Valid: false,
      validationFailed: false,

      // Todo: constants file
      provinces: ['AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','QC','SK','YT'],

      // Business
      businessNameRules: [
        v => !!v || 'Business name is required',
      ],
      businessAddressLine1Rules: [
        v => !!v || 'Business address is required',
      ],
      businessAddressCityRules: [
        v => !!v || 'City is required',
      ],
      businessAddressProvinceRules: [
        v => !!v || 'Province is required',
      ],
      businessAddressPostalCodeRules: [
        v => !!v || 'Postal Code is required',
      ],

      // Contact
      firstNameRules: [
        v => !!v || 'First name is required',
        v => (v && v.length <= 100) || 'First name must be less than 100? characters',
      ],
      lastNameRules: [
        v => !!v || 'Last name is required',
        v => (v && v.length <= 100) || 'Last name must be less than 100? characters',
      ],
      phone1Rules: [
        v => !!v || 'Phone number is required',
        v => validator.isMobilePhone(v) || 'invalid phone number format',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v=> validator.isEmail(v, { allow_display_name: true }) || 'invalid e-mail format',
        v => (v && v.length <= 100) || 'E-mail must be less than 100? characters',
      ],

      // Covid Contact
      covidFirstNameRules: [
        v => !!v || 'First name is required',
        v => (v && v.length <= 100) || 'First name must be less than 100? characters',
      ],
      covidLastNameRules: [
        v => !!v || 'Last name is required',
        v => (v && v.length <= 100) || 'Last name must be less than 100? characters',
      ],
      covidPhone1Rules: [
        v => !!v || 'Phone number is required',
        v => validator.isMobilePhone(v) || 'invalid phone number format',
      ],
      covidEmailRules: [
        v => !!v || 'E-mail is required',
        v=> validator.isEmail(v, { allow_display_name: true }) || 'invalid e-mail format',
        v => (v && v.length <= 100) || 'E-mail must be less than 100? characters',
      ],
    };
  },
  computed: {
    ...mapGetters('form', ['business', 'contacts', 'covidContact', 'ipcPlan', 'location']),
    ...mapGetters('auth', ['hasSilvipcRoles']),

    // Business
    businessName: {
      get() { return this.business.name; },
      set(value) { this.updateBusiness({['name']: value}); }
    },
    businessAddressLine1: {
      get() { return this.business.addressLine1; },
      set(value) { this.updateBusiness({['addressLine1']: value}); }
    },
    businessAddressLine2: {
      get() { return this.business.addressLine2; },
      set(value) { this.updateBusiness({['addressLine2']: value}); }
    },
    businessAddressCity: {
      get() { return this.business.city; },
      set(value) { this.updateBusiness({['city']: value}); }
    },
    businessAddressProvince: {
      get() { return this.business.province; },
      set(value) { this.updateBusiness({['province']: value}); }
    },
    businessAddressPostalCode: {
      get() { return this.business.postalCode; },
      set(value) { this.updateBusiness({['postalCode']: value}); }
    },

    // Contact
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

    // COVID Coordinator
    covidFirstName: {
      get() { return this.covidContact.firstName; },
      set(value) { this.updateCovidContact({['firstName']: value}); }
    },
    covidLastName: {
      get() { return this.covidContact.lastName; },
      set(value) { this.updateCovidContact({['lastName']: value}); }
    },
    covidPhone1: {
      get() { return this.covidContact.phone1; },
      set(value) { this.updateCovidContact({['phone1']: value}); }
    },
    covidPhone2: {
      get() { return this.covidContact.phone2; },
      set(value) { this.updateCovidContact({['phone2']: value}); }
    },
    covidEmail: {
      get() { return this.covidContact.email; },
      set(value) { this.updateCovidContact({['email']: value}); }
    },

  },
  methods: {
    ...mapMutations('form', ['setStep', 'updateBusiness', 'updateContacts', 'updateCovidContact', 'updateIpcPlan']),
    async submit() {
      if(this.$refs.form.validate()) {
        this.setStep(3);
      } else {
        await new Promise(r => setTimeout(r, 200)); //ugh
        const el = document.querySelector('.v-messages.error--text:first-of-type');
        el.scrollIntoView(true);
        window.scrollBy(0, -60); // ugh again
      }
    },
  },
  mounted() {

    if(!this.reviewMode) {
      // Once they've gotten to the form start (step 2) enable the typical "leave site" native browser warning
      // This gets disabled after form submit in step 6
      window.onbeforeunload = () => true;
    }

  }
};
</script>

<style lang="scss" scoped>
form {
  h4:not(.heading-field-label) {
    padding-bottom: 1em;
  }
  hr {
    margin-bottom: 1.75em;
    margin-top: 0.5em;
  }
  .row {
    div[class^='col-'],
    div[class*=' col-'] {
      padding-bottom: 0;
      padding-top: 0;
    }
  }
}
</style>

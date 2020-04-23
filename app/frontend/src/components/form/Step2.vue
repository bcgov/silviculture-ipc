<template>
  <v-container>
    <div class="hide-on-review">
      <h2 class="pb-8">Provide your business contact information</h2>
      <hr class="orange" />
    </div>

    <v-container>
      <v-form v-model="step2Valid">
        <v-row>
          <v-col cols="12" lg="10">
            <h4 class="mb-1">Registered Business Name</h4>
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
              :rules="phone1Rules"
              prepend-inner-icon="phone"
              v-model="phone1"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>
              Phone Number (Secondary Contact)
              <small>- optional</small>
            </label>
            <v-text-field dense flat outlined solo prepend-inner-icon="phone" v-model="phone2" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
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

        <div v-if="addressPOC">
          <hr />

          <h4>Business Address</h4>
          <span
            class="red--text"
          >Note: business requirements TBD. Will not save to submitted form yet</span>
          <v-row>
            <v-col cols="12" sm="6" lg="5">
              <label>Address line 1</label>
              <v-text-field dense flat outlined solo />
            </v-col>
            <v-col cols="12" sm="6" lg="5">
              <label>Address line 2</label>
              <v-text-field dense flat outlined solo />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" lg="5">
              <label>City</label>
              <v-text-field dense flat outlined solo />
            </v-col>
            <v-col cols="12" sm="3" lg="2">
              <label>Province</label>
              <v-select :items="provinces" dense flat outlined solo />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="3" lg="2">
              <label>Postal Code</label>
              <v-text-field dense flat outlined solo />
            </v-col>
          </v-row>

          <hr />

          <h4>COVID-19 Coordinator</h4>
          <span
            class="red--text"
          >Note: business requirements TBD. Will not save to submitted form yet</span>
          <v-row>
            <v-col cols="12" sm="6" lg="5">
              <label>First Name</label>
              <v-text-field dense flat outlined solo />
            </v-col>
            <v-col cols="12" sm="6" lg="5">
              <label>Last Name</label>
              <v-text-field dense flat outlined solo />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" lg="5">
              <label>Phone Number</label>
              <v-text-field dense flat outlined solo prepend-inner-icon="phone" />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" lg="5">
              <label>
                Phone Number (Secondary Contact)
                <small>- optional</small>
              </label>
              <v-text-field dense flat outlined solo prepend-inner-icon="phone" />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" lg="5">
              <label>e-mail Address (Primary Contact)</label>
              <v-text-field dense flat outlined solo prepend-inner-icon="email" />
            </v-col>
          </v-row>

          <hr />

          <div class="hide-on-review">
            <h2 class="pb-8">Provide your planting camp locations</h2>
            <hr class="orange" />
          </div>
          <h4>Planting Camp Sites During the Season</h4>
          <span
            class="red--text"
          >Note: pending business requirements TBD. Will not save to submitted form yet</span>
          <br />
          <br />

          <v-row no-gutters>
            <v-col cols="12" lg="2">
              <label>Total number of locations</label>
              <v-select
                class="pt-0 mt-0"
                v-model="locationCount"
                @change="numLocationsChanged"
                :readonly="reviewMode"
                :items="numbers"
                dense
                flat
                outlined
                solo
              ></v-select>
            </v-col>
          </v-row>

          <v-card class="my-3" v-for="(loc, index) in campLocations" :key="index">
            <v-card-text>
              <CampLocation :index="index" :reviewMode="reviewMode"/>
            </v-card-text>
          </v-card>
        </div>
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
import validator from 'validator';
import { mapGetters, mapMutations } from 'vuex';

import OrgBookSearch from '@/components/form/OrgBookSearch.vue';
import CampLocation from '@/components/form/CampLocation.vue';

export default {
  name: 'Step2',
  props: {
    reviewMode: Boolean
  },
  components: {
    OrgBookSearch,
    CampLocation
  },
  data() {
    return {
      step2Valid: false,
      menu2: false,

      dateFormatted: '',

      // temp: temp
      addressPOC: true,
      locationCount: 1,

      // Todo: constants file
      provinces: ['AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','QC','SK','YT'],
      numbers: [1,2,3,4,5,6,7,8,9,10], //??

      businessNameRules: [
        v => !!v || 'Business name is required',
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
        v => !!v || 'Phone number is required',
        v => validator.isMobilePhone(v) || 'invalid phone number format',
      ],
      emailRules: [
        v => !!v || 'e-mail is required',
        v=> validator.isEmail(v, { allow_display_name: true }) || 'invalid e-mail format',
        v => (v && v.length <= 100) || 'e-mail must be less than 100? characters',
      ],
    };
  },
  computed: {
    ...mapGetters('form', ['business', 'contacts', 'ipcPlan', 'campLocations']),

    // Business
    businessName: {
      get() { return this.business.name; },
      set(value) { this.updateBusiness({['name']: value}); }
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
  },
  methods: {
    ...mapMutations('form', ['setStep', 'updateBusiness', 'updateContacts', 'updateIpcPlan', 'setCampLocationNumber']),

    updateBusinessName: function (org) {
      this.businessName = org;
    },
    numLocationsChanged(e) {
      this.setCampLocationNumber(e);
    }
  }
};
</script>


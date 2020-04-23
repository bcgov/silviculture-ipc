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
            <!-- <OrgBookSearch
              v-model="businessName"
              :field-rules="businessNameRules"
            />-->
            <v-text-field
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

          <h4>Temporary Foreign Worker facility address(es)</h4>
          <span
            class="red--text"
          >Note: pending business requirements TBD. Will not save to submitted form yet</span>

          <v-checkbox v-model="tfwSameAddress" label="Same as business address"></v-checkbox>

          <div v-if="!tfwSameAddress">
            <v-card class="mb-5" v-for="(address, index) in tfwAddresses" :key="index">
              <v-card-text>
                <h4>Facility address {{ index + 1 }}</h4>

                <v-row>
                  <v-col cols="12" sm="6" lg="5">
                    <label>Facility type</label>
                    <v-select :items="facilityTypes" dense flat outlined solo />
                  </v-col>
                </v-row>

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
              </v-card-text>
            </v-card>

            <a class="buttonLink" href="#" @click.prevent="addTfwFacility()">
              <strong>Add another facility</strong>
              <v-btn color="primary" icon large>
                <v-icon>add</v-icon>
              </v-btn>
            </a>
          </div>
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

//import OrgBookSearch from '@/components/form/OrgBookSearch.vue';

export default {
  name: 'Step2',
  props: {
    reviewMode: Boolean
  },
  components: {
    //OrgBookSearch
  },
  data() {
    return {
      step2Valid: false,

      // temp: temp
      addressPOC: true,

      // Todo: constants file
      provinces: ['AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','QC','SK','YT'],
      facilityTypes: ['Tent', 'Cabin', 'RV', 'etc etc'],

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
    ...mapGetters('form', ['business', 'contacts', 'ipcPlan', 'tfwAddresses']),

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

    // Temporary Foreign Worker facility
    tfwSameAddress: {
      get() { return this.ipcPlan.tfwSameAddress; },
      set(value) { this.updateIpcPlan({['tfwSameAddress']: value}); }
    },
  },
  methods: {
    ...mapMutations('form', ['addTfWAddress', 'setStep', 'updateBusiness', 'updateContacts', 'updateIpcPlan']),
    addTfwFacility() {
      this.addTfWAddress();
    },
    updateBusinessName: function (org) {
      this.businessName = org;
    }
  }
};
</script>


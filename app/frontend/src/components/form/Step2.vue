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
            <label>
              Address line 2 -
              <small>optional</small>
            </label>
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
              prepend-inner-icon="phone"
              v-model="covidPhone1"
              :rules="covidPhone1Rules"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>
              Phone Number (Secondary Contact)
              <small>- optional</small>
            </label>
            <v-text-field
              dense
              flat
              outlined
              solo
              prepend-inner-icon="phone"
              v-model="covidPhone2"
            />
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
              prepend-inner-icon="email"
              v-model="covidEmail"
              :rules="covidEmailRules"
            />
          </v-col>
        </v-row>

        <hr />
        <h4>Provide your planting camp location</h4>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <v-menu
              v-model="startDateMenu"
              :close-on-content-click="true"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="startDate"
                  :rules="startDateRules"
                  label="Start Date"
                  append-icon="event"
                  v-on:click:append="startDateMenu=true"
                  readonly
                  v-on="on"
                  dense
                  flat
                  outlined
                  solo
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="startDate"
                @input="startDateMenu = false"
                :readonly="reviewMode"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="6" lg="5">
            <v-menu
              v-model="endDateMenu"
              :close-on-content-click="true"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="endDate"
                  :rules="endDateRules"
                  label="End Date"
                  append-icon="event"
                  v-on:click:append="endDateMenu=true"
                  readonly
                  v-on="on"
                  dense
                  flat
                  outlined
                  solo
                ></v-text-field>
              </template>
              <v-date-picker v-model="endDate" @input="endDateMenu = false" :readonly="reviewMode"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>Address line 1</label>
            <v-text-field
              v-model="locationAddressLine1"
              :rules="locationAddressLine1Rules"
              dense
              flat
              outlined
              solo
            />
          </v-col>

          <v-col cols="12" sm="6" lg="5">
            <label>
              Address line 2 -
              <small>optional</small>
            </label>
            <v-text-field v-model="locationAddressLine2" dense flat outlined solo />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>City</label>
            <v-text-field
              v-model="locationCity"
              :rules="locationCityRules"
              dense
              flat
              outlined
              solo
            />
          </v-col>
          <v-col cols="12" sm="3" lg="2">
            <label>Province</label>
            <v-select
              v-model="locationProvince"
              :rules="locationProvinceRules"
              :items="provinces"
              dense
              flat
              outlined
              solo
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="3" lg="2">
            <label>Postal Code</label>
            <v-text-field
              v-model="locationPostalCode"
              :rules="locationPostalCodeRules"
              dense
              flat
              outlined
              solo
            />
          </v-col>
        </v-row>

        <h4>Type of accommodation for planters at this location (check all that apply)</h4>

        <v-checkbox v-model="accTents" :readonly="reviewMode" label="Tents near worksite"></v-checkbox>

        <div v-if="accTents">
          <v-row>
            <v-col cols="12" lg="10">
              <label>
                Details (eg:
                <em>"1km from HWY 1 at 100 mile house north on Logging Road"</em>)
              </label>
              <v-text-field v-model="tentDetails" dense flat outlined solo />
            </v-col>
          </v-row>
        </div>

        <v-checkbox v-model="accMotel" :readonly="reviewMode" label="Motel/Hotel in town"></v-checkbox>
        <div v-if="accMotel">
          <v-row>
            <v-col cols="12" sm="6" lg="5">
              <label>Name</label>
              <v-text-field v-model="motelName" dense flat outlined solo />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" lg="5">
              <label>Address line 1</label>
              <v-text-field v-model="motelAddressLine1" dense flat outlined solo />
            </v-col>

            <v-col cols="12" sm="6" lg="5">
              <label>
                Address line 2 -
                <small>optional</small>
              </label>
              <v-text-field v-model="motelAddressLine2" dense flat outlined solo />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" lg="5">
              <label>City</label>
              <v-text-field v-model="motelCity" dense flat outlined solo />
            </v-col>
            <v-col cols="12" sm="3" lg="2">
              <label>Province</label>
              <v-select v-model="motelProvince" :items="provinces" dense flat outlined solo />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="3" lg="2">
              <label>Postal Code</label>
              <v-text-field v-model="motelPostalCode" dense flat outlined solo />
            </v-col>
          </v-row>
        </div>

        <v-checkbox
          v-model="accWorkersHome"
          :readonly="reviewMode"
          label="Worker's home in community"
        ></v-checkbox>
      </v-container>

      <div class="hide-on-review">
        <h2 class="pb-8 mt-8">Provide licencee(s)</h2>
        <hr class="orange" />
      </div>

      <v-container>
        <v-row>
          <v-col cols="12" lg="10">
            <h4 class="mb-3">Name of Licencee(s)</h4>
            <label>Provide the name or names of the licensee(s) that you are conducting the work for.</label>
            <v-text-field dense flat outlined solo v-model="licencees" :rules="licenceesRules" />
          </v-col>
        </v-row>
      </v-container>
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

export default {
  name: 'Step2',
  props: {
    reviewMode: Boolean
  },
  components: {
    OrgBookSearch
  },
  data() {
    return {
      step2Valid: false,
      validationFailed: false,
      startDateMenu: false,
      endDateMenu: false,

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
        v => !!v || 'e-mail is required',
        v=> validator.isEmail(v, { allow_display_name: true }) || 'invalid e-mail format',
        v => (v && v.length <= 100) || 'e-mail must be less than 100? characters',
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
        v => !!v || 'e-mail is required',
        v=> validator.isEmail(v, { allow_display_name: true }) || 'invalid e-mail format',
        v => (v && v.length <= 100) || 'e-mail must be less than 100? characters',
      ],

      // Location
      licenceesRules: [
        v => !!v || 'name of licencee(s) required'
      ],
      startDateRules: [
        v => !!v || 'start date is required'
      ],
      endDateRules: [
        v => !!v || 'end date is required'
      ],
      locationAddressLine1Rules: [
        v => !!v || 'line 1 is required'
      ],
      locationCityRules: [
        v => !!v || 'city is required'
      ],
      locationProvinceRules: [
        v => !!v || 'province is required'
      ],
      locationPostalCodeRules: [
        v => !!v || 'postal code is required'
      ],
    };
  },
  computed: {
    ...mapGetters('form', ['business', 'contacts', 'covidContact', 'ipcPlan', 'location']),

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

    // Location
    licencees: {
      get() { return this.location.licencees; },
      set(value) { this.updateLocation({['licencees']: value}); }
    },
    startDate: {
      get() { return this.location.startDate; },
      set(value) { this.updateLocation({['startDate']: value}); }
    },
    endDate: {
      get() { return this.location.endDate; },
      set(value) { this.updateLocation({['endDate']: value}); }
    },
    locationAddressLine1: {
      get() { return this.location.addressLine1; },
      set(value) { this.updateLocation({['addressLine1']: value}); }
    },
    locationAddressLine2: {
      get() { return this.location.addressLine2; },
      set(value) { this.updateLocation({['addressLine2']: value}); }
    },
    locationCity: {
      get() { return this.location.city; },
      set(value) { this.updateLocation({['city']: value}); }
    },
    locationProvince: {
      get() { return this.location.province; },
      set(value) { this.updateLocation({['province']: value}); }
    },
    locationPostalCode: {
      get() { return this.location.postalCode; },
      set(value) { this.updateLocation({['postalCode']: value}); }
    },
    accTents: {
      get() { return this.location.accTents; },
      set(value) { this.updateLocation({['accTents']: value}); }
    },
    tentDetails: {
      get() { return this.location.tentDetails; },
      set(value) { this.updateLocation({['tentDetails']: value}); }
    },
    accMotel: {
      get() { return this.location.accMotel; },
      set(value) { this.updateLocation({['accMotel']: value}); }
    },
    motelName: {
      get() { return this.location.motelName; },
      set(value) { this.updateLocation({['motelName']: value}); }
    },
    motelAddressLine1: {
      get() { return this.location.motelAddressLine1; },
      set(value) { this.updateLocation({['motelAddressLine1']: value}); }
    },
    motelAddressLine2: {
      get() { return this.location.motelAddressLine2; },
      set(value) { this.updateLocation({['motelAddressLine2']: value}); }
    },
    motelCity: {
      get() { return this.location.motelCity; },
      set(value) { this.updateLocation({['motelCity']: value}); }
    },
    motelProvince: {
      get() { return this.location.motelProvince; },
      set(value) { this.updateLocation({['motelProvince']: value}); }
    },
    motelPostalCode: {
      get() { return this.location.motelPostalCode; },
      set(value) { this.updateLocation({['motelPostalCode']: value}); }
    },
    accWorkersHome: {
      get() { return this.location.accWorkersHome; },
      set(value) { this.updateLocation({['accWorkersHome']: value}); }
    },

  },
  methods: {
    ...mapMutations('form', ['setStep', 'updateBusiness', 'updateContacts', 'updateCovidContact', 'updateIpcPlan', 'updateLocation']),
    async submit() {
      if(this.$refs.form.validate()) {
        this.setStep(3);
      } else {
        await new Promise(r => setTimeout(r, 200)); //ugh
        const el = document.querySelector('.v-messages.error--text:first-of-type');
        el.scrollIntoView(true);
        window.scrollBy(0, -60); // ugh again
      }
    }
  },
  mounted() {
    // Once they've gotten to the form start (step 2) enable the typical "leave site" native browser warning
    // This gets disabled after form submit in step 6
    window.onbeforeunload = () => true;

  }
};
</script>


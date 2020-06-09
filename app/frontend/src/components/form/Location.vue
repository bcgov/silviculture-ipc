<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" class="pt-3">
          <h4>Operation Details</h4>
        </v-col>
      </v-row>

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
              <label>Operation Start Date</label>
              <v-text-field
                v-model="startDate"
                :rules="startDateRules"
                placeholder="yyyy-mm-dd"
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
              <label>Operation End Date</label>
              <v-text-field
                v-model="endDate"
                :rules="endDateRules"
                placeholder="yyyy-mm-dd"
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
          <label>Closest Community / Town / City</label>
          <CityLookup
            v-if="!reviewMode"
            :city-field-model.sync="locationCity"
            :city-latitude-field-model.sync="cityLatitude"
            :city-longitude-field-model.sync="cityLongitude"
            :field-rules="locationCityRules"
            :currentValue="locationCity"
          />
          <v-text-field
            v-if="reviewMode"
            dense
            flat
            outlined
            solo
            v-model="locationCity"
            :rules="locationCityRules"
          />
          <v-text-field v-model="cityLatitude" class="d-none" />
          <v-text-field v-model="cityLongitude" class="d-none" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="4" lg="3">
          <label>Number of workers at this location</label>
          <v-text-field
            v-model="numberOfWorkers"
            :rules="numberOfWorkersRules"
            type="number"
            min="1"
            dense
            flat
            outlined
            solo
          />
        </v-col>
      </v-row>

      <h4>Type of accommodations provided by employers for workers at this location (check all that apply)</h4>

      <v-checkbox v-model="accTents" :readonly="reviewMode" label="Tent or trailer sites"></v-checkbox>

      <div v-if="accTents">
        <v-row>
          <v-col cols="12" lg="10">
            <label>
              Details (eg:
              <em>"1km from HWY 1 at 100 mile house north on Logging Road"</em>)
            </label>
            <v-text-field
              v-model="tentDetails"
              :rules="[v => v.length <= 255 || 'Please enter 255 characters or less']"
              dense flat outlined solo
            />
          </v-col>
        </v-row>
      </div>

      <v-checkbox v-model="accMotel" :readonly="reviewMode" label="Worker’s Lodging Location (Motel, hotel, or other lodging)"></v-checkbox>
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
            <label>Address line 2 (Optional)</label>
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
            <v-select
              dense
              flat
              outlined
              solo
              single-line
              label="select"
              v-model="motelProvince"
              :items="provinces"
            />
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
          <label>Provide the name or names of the licencee(s) that you are conducting the work for</label>
          <v-text-field dense flat outlined solo v-model="licencees" :rules="licenceesRules" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import CityLookup from '@/components/form/CityLookup.vue';

export default {
  name: 'Location',
  props: {
    reviewMode: Boolean
  },
  components: {
    CityLookup,
  },
  data() {
    return {
      startDateMenu: false,
      endDateMenu: false,

      // Todo: constants file
      provinces: ['AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','QC','SK','YT'],

      // Location
      startDateRules: [v => !!v || 'Start date is required'],
      endDateRules: [v => !!v || 'End date is required'],
      locationCityRules: [
        v => !!v || 'Closest Community / Town / City is required'
      ],
      // Todo, put in some utility fxn somewhere if needed again
      numberOfWorkersRules: [
        v => new RegExp('^[-+]?\\d+$').test(v) || 'invalid # of workers',
        v => v > 0 || '# of workers must be greater than 0',
        v => v < 9999 || '# of workers must 9999 or less'
      ],
      // Licencee
      licenceesRules: [
        v => !!v || 'Name of licencee(s) required'
      ],
    };
  },
  computed: {
    ...mapGetters('form', ['location']),
    ...mapGetters('auth', ['hasSilvipcRoles']),

    // Location
    startDate: {
      get() { return this.location.startDate; },
      set(value) { this.updateLocation({['startDate']: value}); }
    },
    endDate: {
      get() { return this.location.endDate; },
      set(value) { this.updateLocation({['endDate']: value}); }
    },
    locationCity: {
      get() { return this.location.city; },
      set(value) { this.updateLocation({['city']: value}); }
    },
    cityLatitude: {
      get() { return this.location.cityLatitude; },
      set(value) { this.updateLocation({['cityLatitude']: value}); }
    },
    cityLongitude: {
      get() { return this.location.cityLongitude; },
      set(value) { this.updateLocation({['cityLongitude']: value}); }
    },
    numberOfWorkers: {
      get() { return this.location.numberOfWorkers ? this.location.numberOfWorkers.toString() : ''; },
      set(value) { this.updateLocation({['numberOfWorkers']:
        Number.isNaN(value) ? 0 : Number.parseInt(value)});
      }
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
    licencees: {
      get() { return this.location.licencees; },
      set(value) { this.updateLocation({['licencees']: value}); }
    },
  },
  methods: {
    ...mapMutations('form', ['updateLocation'])
  },
  mounted() {
    document.querySelectorAll('.review-form input, .review-form .v-select').forEach(q => {
      q.setAttribute('readonly', 'false');
      q.style.pointerEvents = 'none';
    });
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

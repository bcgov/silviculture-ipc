<template>
  <v-container>
    <h4>Location {{ index + 1 }}</h4>

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
              label="Start Date"
              prepend-icon="event"
              readonly
              v-on="on"
              dense
              flat
              outlined
              solo
            ></v-text-field>
          </template>
          <v-date-picker v-model="startDate" @input="startDateMenu = false" :readonly="reviewMode"></v-date-picker>
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
              label="End Date"
              prepend-icon="event"
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
        <v-text-field v-model="addressLine1" dense flat outlined solo />
      </v-col>

      <v-col cols="12" sm="6" lg="5">
        <label>Address line 2</label>
        <v-text-field v-model="addressLine2" dense flat outlined solo />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" lg="5">
        <label>City</label>
        <v-text-field v-model="city" dense flat outlined solo />
      </v-col>
      <v-col cols="12" sm="3" lg="2">
        <label>Province</label>
        <v-select
          v-model="province"
          :items="provinces"
          :readonly="reviewMode"
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
        <v-text-field v-model="postalCode" dense flat outlined solo />
      </v-col>
    </v-row>

    <h4>Type of accomodation for planters (check all that apply)</h4>

    <v-checkbox v-model="accTents" :readonly="reviewMode" label="Tents near worksite"></v-checkbox>

    <div v-if="accTents">
      <v-row>
        <v-col cols="12" sm="6" lg="5">
          <label>Address line 1</label>
          <v-text-field
            v-model="accTentsAddressLine1"
            :readonly="reviewMode"
            dense
            flat
            outlined
            solo
          />
        </v-col>

        <v-col cols="12" sm="6" lg="5">
          <label>Address line 2</label>
          <v-text-field
            v-model="accTentsAddressLine2"
            :readonly="reviewMode"
            dense
            flat
            outlined
            solo
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" lg="5">
          <label>City</label>
          <v-text-field v-model="accTentsCity" :readonly="reviewMode" dense flat outlined solo />
        </v-col>
        <v-col cols="12" sm="3" lg="2">
          <label>Province</label>
          <v-select
            v-model="accTentsProvince"
            :items="provinces"
            :readonly="reviewMode"
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
            v-model="accTentsPostalCode"
            :readonly="reviewMode"
            dense
            flat
            outlined
            solo
          />
        </v-col>
      </v-row>
    </div>

    <v-checkbox v-model="accMotel" :readonly="reviewMode" label="Motel/Hotel in town"></v-checkbox>
    <div v-if="accMotel">
      <v-row>
        <v-col cols="12" sm="6" lg="5">
          <label>Address line 1</label>
          <v-text-field
            v-model="accMotelAddressLine1"
            :readonly="reviewMode"
            dense
            flat
            outlined
            solo
          />
        </v-col>

        <v-col cols="12" sm="6" lg="5">
          <label>Address line 2</label>
          <v-text-field
            v-model="accMotelAddressLine2"
            :readonly="reviewMode"
            dense
            flat
            outlined
            solo
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" lg="5">
          <label>City</label>
          <v-text-field v-model="accMotelCity" :readonly="reviewMode" dense flat outlined solo />
        </v-col>
        <v-col cols="12" sm="3" lg="2">
          <label>Province</label>
          <v-select
            v-model="accMotelProvince"
            :items="provinces"
            :readonly="reviewMode"
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
            v-model="accMotelPostalCode"
            :readonly="reviewMode"
            dense
            flat
            outlined
            solo
          />
        </v-col>
      </v-row>
    </div>

    <v-checkbox v-model="accWh" :readonly="reviewMode" label="Worker's home in community"></v-checkbox>
    <div v-if="accWh">
      <v-row>
        <v-col cols="12" sm="6" lg="5">
          <label>Address line 1</label>
          <v-text-field
            v-model="accWhAddressLine1"
            :readonly="reviewMode"
            dense
            flat
            outlined
            solo
          />
        </v-col>

        <v-col cols="12" sm="6" lg="5">
          <label>Address line 2</label>
          <v-text-field
            v-model="accWhAddressLine2"
            :readonly="reviewMode"
            dense
            flat
            outlined
            solo
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" lg="5">
          <label>City</label>
          <v-text-field v-model="accWhCity" :readonly="reviewMode" dense flat outlined solo />
        </v-col>
        <v-col cols="12" sm="3" lg="2">
          <label>Province</label>
          <v-select
            v-model="accWhProvince"
            :items="provinces"
            :readonly="reviewMode"
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
          <v-text-field v-model="accWhPostalCode" :readonly="reviewMode" dense flat outlined solo />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';


export default {
  name: 'CampLocation',
  props: ['index', 'reviewMode'],
  data() {
    return {
      startDateMenu: false,
      endDateMenu: false,

      // TEMP
      tents: false,
      motel: false,
      workersHome: false,

      // Todo: constants file
      provinces: ['AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','QC','SK','YT'],
    };
  },
  computed: {
    ...mapGetters('form', ['campLocations']),

    // Location Address
    startDate: {
      get() { return this.campLocations[this.index].startDate; },
      set(value) { this.updateCampLocations({index: this.index, obj: {['startDate']: value}}); }
    },
    endDate: {
      get() { return this.campLocations[this.index].endDate; },
      set(value) { this.updateCampLocations({index: this.index, obj: {['endDate']: value}}); }
    },
    addressLine1: {
      get() { return this.campLocations[this.index].addressLine1; },
      set(value) { this.updateCampLocations({index: this.index, obj: {['addressLine1']: value}}); }
    },
    addressLine2: {
      get() { return this.campLocations[this.index].addressLine2; },
      set(value) { this.updateCampLocations({index: this.index, obj: {['addressLine2']: value}}); }
    },
    city: {
      get() { return this.campLocations[this.index].city; },
      set(value) { this.updateCampLocations({index: this.index, obj: {['city']: value}}); }
    },
    province: {
      get() { return this.campLocations[this.index].province; },
      set(value) { this.updateCampLocations({index: this.index, obj: {['province']: value}}); }
    },
    postalCode: {
      get() { return this.campLocations[this.index].postalCode; },
      set(value) { this.updateCampLocations({index: this.index, obj: {['postalCode']: value}}); }
    },

    // Tents
    accTents: {
      get() { return this.campLocations[this.index].accTents; },
      set(value) { this.updateCampLocations({index: this.index, obj: {['accTents']: value}}); }
    },
    accTentsAddressLine1: {
      get() { return this.campLocations[this.index].tentAddress.addressLine1; },
      set(value) { this.updateTentAddress({index: this.index, obj: {['addressLine1']: value}}); }
    },
    accTentsAddressLine2: {
      get() { return this.campLocations[this.index].tentAddress.addressLine2; },
      set(value) { this.updateTentAddress({index: this.index, obj: {['addressLine2']: value}}); }
    },
    accTentsCity: {
      get() { return this.campLocations[this.index].tentAddress.city; },
      set(value) { this.updateTentAddress({index: this.index, obj: {['city']: value}}); }
    },
    accTentsProvince: {
      get() { return this.campLocations[this.index].tentAddress.province; },
      set(value) { this.updateTentAddress({index: this.index, obj: {['province']: value}}); }
    },
    accTentsPostalCode: {
      get() { return this.campLocations[this.index].tentAddress.postalCode; },
      set(value) { this.updateTentAddress({index: this.index, obj: {['postalCode']: value}}); }
    },

    // Motel
    accMotel: {
      get() { return this.campLocations[this.index].accMotel; },
      set(value) { this.updateCampLocations({index: this.index, obj: {['accMotel']: value}}); }
    },
    accMotelAddressLine1: {
      get() { return this.campLocations[this.index].motelAddress.addressLine1; },
      set(value) { this.updateMotelAddress({index: this.index, obj: {['addressLine1']: value}}); }
    },
    accMotelAddressLine2: {
      get() { return this.campLocations[this.index].motelAddress.addressLine2; },
      set(value) { this.updateMotelAddress({index: this.index, obj: {['addressLine2']: value}}); }
    },
    accMotelCity: {
      get() { return this.campLocations[this.index].motelAddress.city; },
      set(value) { this.updateMotelAddress({index: this.index, obj: {['city']: value}}); }
    },
    accMotelProvince: {
      get() { return this.campLocations[this.index].motelAddress.province; },
      set(value) { this.updateMotelAddress({index: this.index, obj: {['accMotelProvince']: value}}); }
    },
    accMotelPostalCode: {
      get() { return this.campLocations[this.index].motelAddress.postalCode; },
      set(value) { this.updateMotelAddress({index: this.index, obj: {['postalCode']: value}}); }
    },

    // WorkersHome
    accWh: {
      get() { return this.campLocations[this.index].accWh; },
      set(value) { this.updateCampLocations({index: this.index, obj: {['accWh']: value}}); }
    },
    accWhAddressLine1: {
      get() { return this.campLocations[this.index].whAddress.addressLine1; },
      set(value) { this.updateWhAddress({index: this.index, obj: {['addressLine1']: value}}); }
    },
    accWhAddressLine2: {
      get() { return this.campLocations[this.index].whAddress.addressLine2; },
      set(value) { this.updateWhAddress({index: this.index, obj: {['addressLine2']: value}}); }
    },
    accWhCity: {
      get() { return this.campLocations[this.index].whAddress.city; },
      set(value) { this.updateWhAddress({index: this.index, obj: {['city']: value}}); }
    },
    accWhProvince: {
      get() { return this.campLocations[this.index].whAddress.province; },
      set(value) { this.updateWhAddress({index: this.index, obj: {['province']: value}}); }
    },
    accWhPostalCode: {
      get() { return this.campLocations[this.index].whAddress.postalCode; },
      set(value) { this.updateWhAddress({index: this.index, obj: {['postalCode']: value}}); }
    },

  },
  methods: {
    ...mapMutations('form', ['setStep', 'updateTentAddress', 'updateMotelAddress', 'updateWhAddress', 'updateCampLocations', 'updateBusiness', 'updateContacts', 'updateIpcPlan']),
  }
};
</script>


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
              v-model="date"
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
          <v-date-picker v-model="date" @input="startDateMenu = false"></v-date-picker>
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
              v-model="date2"
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
          <v-date-picker v-model="date2" @input="endDateMenu = false"></v-date-picker>
        </v-menu>
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

    <h4>Type of accomodation for planters (check all that apply)</h4>

    <v-checkbox v-model="tents" :readonly="reviewMode" label="Tents near worksite"></v-checkbox>

    <div v-if="tents">
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
    </div>

    <v-checkbox v-model="motel" :readonly="reviewMode" label="Motel/Hotel in town"></v-checkbox>
    <div v-if="motel">
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
    </div>

    <v-checkbox v-model="workersHome" :readonly="reviewMode" label="Worker's home in community"></v-checkbox>
    <div v-if="workersHome">
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
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';


export default {
  name: 'CampLocation',
  props: ['index'],
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

  },
  methods: {
    ...mapMutations('form', ['setStep', 'updateBusiness', 'updateContacts', 'updateIpcPlan']),
  }
};
</script>


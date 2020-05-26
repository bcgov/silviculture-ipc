<template>
  <v-dialog v-model="dialog" max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="true" @click="openDialog" v-on="on" color="primary" class="my-3" small>Edit Submission</v-btn>
    </template>
    <v-card>
      <v-form ref="form" v-model="updateValid">
        <v-card-title>
          <span class="headline">
            Editing submission from:
            <strong>{{businessName}}</strong>
          </span>
        </v-card-title>
        <v-card-text>
          <v-container class="pa-0">

            <!-- use Location form component -->
            <Location :reviewMode="false"/>

          </v-container>
        </v-card-text>
        <v-card-actions class="pa-3 pb-10">
          <v-btn color="primary" @click="submit">Save</v-btn>
          <v-btn text @click="cancelUpdate">Cancel</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import form from '@/store/modules/form.js';
import { mapGetters, mapMutations, mapActions } from 'vuex';

import Location from '@/components/form/Location.vue';
import ipcService from '../../../services/ipcService';

export default {
  name: 'LocationEdit',
  components: {
    Location,
  },
  props: {
    ipcPlanId: {
      required: true,
      type: String
    },
  },
  data() {
    return {
      dialog: false,
      updateValid: false,
      reviewMode: false,
      updateComplete: false,
      updateError: '',
      startDateMenu: false,
      endDateMenu: false
    };
  },
  computed: {
    // use local 'edit' store
    ...mapGetters('edit', ['business', 'location']),
    ...mapMutations('edit', ['updateLocation']),

    // Business data
    businessName: {
      get() { return this.business.name; },
    },

    // Location
    // test - use local store in this component - doesnt work as i hoped
    locationCity: {
      get() {
        console.log('in edit component, get locationCity: ', this.location.city);
        return this.location.city;
      },
      set(value) {
        console.log('in set edit component, get locationCity: ', this.location.city);
        this.updateLocation({['city']: value});
      }
    },
  },
  methods: {
    ...mapActions('form', ['getForm']),

    openDialog() {
      document.querySelectorAll('.review-form input, .review-form .v-select').forEach(q => {
        q.setAttribute('readonly', 'false');
        q.style.pointerEvents = 'none';
      });
    },

    async submit() {
      if(this.$refs.form.validate()) {
        await this.updateForm();
        if (this.updateComplete) {
          this.dialog = false;
          // reload form data to show in parent component;
          this.getForm(this.ipcPlanId);
        }
      } else {
        const modal = document.querySelector('.v-dialog--active');
        modal.scrollBy(0, -500);
      }
    },

    async updateForm() {
      try {
        const body = {
          business: this.business,
          contacts: this.contacts,
          ipcPlan: this.ipcPlan,
          covidContact: this.covidContact,
          location: this.location
        };
        const response = await ipcService.updateIPCContent(body);
        if (!response.data) {
          throw new Error('No response data from API while submitting update');
        }
        this.updateComplete = true;
      } catch (error) {
        console.error(`Error submitting update: ${error}`); // eslint-disable-line no-console
        this.updateError = 'An error occurred while attempting to update the form. Please try again.';
      }
    },

    cancelUpdate(){
      this.dialog = false;
      // reload form data in parent component - from the global 'from' state module
      this.getForm(this.ipcPlanId);
    },

  },
  // lazy-load a local copy of the 'form' store into the 'edit' namespace
  beforeCreate() {
    // dynamically register a local vuex module for this 'edit location' component
    if(this.$store.hasModule('edit')) {
      this.$store.unregisterModule('edit');
    }
    this.$store.registerModule('edit', form);
  },
  beforeDestroy() {
    // unload this store
    this.$store.unregisterModule('edit');
  },

};
</script>

<style lang="scss" scoped>
form {
  .row {
    div[class^='col-'],
    div[class*=' col-'] {
      padding-bottom: 0;
      padding-top: 0;
    }
  }
}
</style>

<template>
  <v-dialog v-model="dialog" max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="true" v-on="on" color="primary" class="my-3" small>Edit Submission</v-btn>
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
import { mapGetters, mapActions } from 'vuex';
//import form from '@/store/modules/form.js';

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
    ...mapGetters('form', ['business', 'contacts', 'covidContact', 'ipcPlan', 'location']),

    // Business data
    businessName: {
      get() { return this.business.name; },
    },

  },
  methods: {
    ...mapActions('form', ['getForm']),

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

    async cancelUpdate(){
      // TODO reload location details in step2 component in case user changed details but didnt submit update
      this.dialog = false;
      // reload form data to show in parent component;
      this.getForm(this.ipcPlanId);
    },

  },
  // my attempt to use a local copy of the store
  // created() {
  //   // dynamically register a ephemeral vuex module for this 'edit location' component
  //   if(this.$store.hasModule('edit')) {
  //     this.$store.unregisterModule('edit');
  //   }
  //   this.$store.registerModule('edit', form);
  // },
  // beforeDestroy() {
  //   // unload this store
  //   this.$store.unregisterModule('edit');
  // },

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

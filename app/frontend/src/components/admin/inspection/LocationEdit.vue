<template>
  <v-dialog v-model="dialog" max-width="800px">
    <template v-slot:activator="{ on }">
      <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
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
          <v-btn color="primary" @click="update">Save</v-btn>
          <v-btn text @click="cancelUpdate">Cancel</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import form from '@/store/modules/form.js';

import Location from '@/components/form/Location.vue';

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
      showEditBtn: false,
      dialog: false,
      updateValid: false,
      reviewMode: false,
      startDateMenu: false,
      endDateMenu: false,
    };
  },
  computed: {
    ...mapGetters('form', ['business', 'ipcPlan', 'location', 'submissionComplete']),
    ...mapActions('form', ['updateForm']),


    // // Business data
    businessName: {
      get() { return this.business.name; },
    },

  },
  methods: {

    async update() {

      if(this.$refs.form.validate()) {

        await this.updateForm();
        if (this.submissionComplete) {
          this.dialog = false;
        }
      } else {
        const modal = document.querySelector('.v-dialog--active');
        modal.scrollBy(0, -500);
      }
    },

    async cancelUpdate(){
      // TODO reload location details in step2 component in case user changed details but didnt submit update
      this.dialog = false;
    },

  },
  mounted() {
  },
  created() {
    // dynamically register a ephemeral vuex module for this 'edit location' component
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

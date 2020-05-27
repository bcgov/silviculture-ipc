<template>
  <v-dialog v-model="dialog" max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn
        v-if="true"
        @click="openDialog"
        v-on="on"
        text
        small
        color="textLink"
        class="pl-0 my-3"
      >
        <v-icon class="mr-1">mdi-pencil</v-icon>Edit Submission
      </v-btn>
    </template>
    <v-card>
      <v-form ref="form">
        <v-card-title class="pa-3 py-10">
          <v-alert v-if="updateError" type="error" tile dense>{{ updateError }}</v-alert>
          <span class="headline">
            Editing:
            <strong>{{businessName}}</strong>
          </span>
        </v-card-title>
        <v-card-text>
          <v-container class="pa-0">
            <h2 class="pb-8">Location Details</h2>
            <hr class="orange" />

            <!-- use Location form component -->
            <Location :reviewMode="false" :key="componentKey"/>

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
      dialog: false,
      componentKey:0
    };
  },
  computed: {
    ...mapGetters('form', ['business', 'updateComplete', 'updateError']),
    // Business data
    businessName: {
      get() { return this.business.name; },
    },
  },
  methods: {
    ...mapActions('form', ['getForm', 'updateForm']),

    openDialog() {
      this.componentKey=!this.componentKey;
      document.querySelectorAll('.review-form input, .review-form .v-select').forEach(q => {
        q.setAttribute('readonly', 'false');
        q.style.pointerEvents = 'none';
      });
    },

    async submit() {
      const modal = document.querySelector('.v-dialog--active');
      if(this.$refs.form.validate()) {
        await this.updateForm();
        if (this.updateComplete) {
          this.dialog = false;
          // reload form data to show in parent component;
          this.getForm(this.ipcPlanId);
        }
        else{
          modal.scrollBy(0, -500);
        }
      } else {
        modal.scrollBy(0, -500);
      }
    },
    cancelUpdate(){
      this.dialog = false;
      // reload form data visible in parent component
      this.getForm(this.ipcPlanId);
    },
  },
  watch: {
    dialog(val) {
      !val && this.cancelUpdate();
    }
  }

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

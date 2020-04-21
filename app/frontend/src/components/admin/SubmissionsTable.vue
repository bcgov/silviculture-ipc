<template>
  <v-card>
    <v-toolbar flat color="grey lighten-3">
      <v-card-title>Form Submissions</v-card-title>
    </v-toolbar>
    <v-container>
      <!-- search input -->
      <div class="ipc-search">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="pb-5"
        ></v-text-field>
      </div>
      <!-- table alert -->
      <v-alert v-if="showAlert" :type="alertType" tile dense>{{alertMessage}}</v-alert>
      <!-- table header -->
      <v-data-table
        :headers="headers"
        :items="submissions"
        :items-per-page="10"
        :search="search"
        :loading="loading"
        loading-text="Loading... Please wait"
        item-key="ipcPlanId"
        class="ipc-table"
      ></v-data-table>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'SubmissionsTable',
  data() {
    return {
      // vuetify data table
      search: '',
      headers: [
        { text: 'Business Name', align: 'start', value: 'name' },
        { text: 'Created', value: 'created' },
        { text: 'Form Data', value: 'data' },
      ],
      submissions: [],
      loading: true,
      showAlert: false,
      alertType: null,
      alertMessage: '',
      expanded: []
    };
  },
  methods: {
    formatDate(date){
      return (date) ? new Date(date).toLocaleString() : 'N/A';
    },
    // get table data from frontend service layer
    getData() {
      /*
      // TODO: need frontend service layer
      ipcService
        .getSubmissions()
        .then(response => {
          const data = response.data;
          // TODO: format data here for use in data table
          if (!data.length) {
            // TODO: use a base alert component if one has been added to the project
            this.showTableAlert('info', 'No Submissions found');
          }
          this.submissions = data;
        })
        .catch(() => {
          // TODO: use a base alert component if one has been added to the project
          this.showTableAlert('error', 'No response from server');
        });
        */
      this.submissions = {};
    },
    showTableAlert(typ, msg) {
      this.showAlert = true;
      this.alertType = typ;
      this.alertMessage = msg;
      this.loading = false;
    },
  },
  mounted() {
    this.getData();
  },
  watch: {
    // hide data table progress bar when submissions have been returned from backend
    submissions() {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.ipc-search {
  width: 100%;
  max-width: 20em;
  float: right;
}
.ipc-table {
  clear: both;
}
</style>

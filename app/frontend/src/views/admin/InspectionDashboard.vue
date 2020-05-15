<template>
  <v-container class="dashboard text-center">
    <BaseSecure inspector>
      <Dashboard :url="dashboardUrl" />
    </BaseSecure>
  </v-container>
</template>

<script>
import Dashboard from '@/components/admin/Dashboard.vue';

export default {
  name: 'InspectionDashboard',
  components: {
    Dashboard
  },
  computed: {
    dashboardUrl() {
      return this.$config ? this.$config.dashboards.inspectionUrl : undefined;
    }
  }
};
</script>

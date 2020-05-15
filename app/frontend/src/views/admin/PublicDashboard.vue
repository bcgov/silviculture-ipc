<template>
  <v-container class="dashboard text-center">
    <BaseSecure>
      <Dashboard :url="dashboardUrl" />
    </BaseSecure>
  </v-container>
</template>

<script>
import Dashboard from '@/components/admin/Dashboard.vue';

export default {
  name: 'PublicDashboard',
  components: {
    Dashboard
  },
  computed: {
    dashboardUrl() {
      return this.$config ? this.$config.dashboards.publicUrl : undefined;
    }
  }
};
</script>

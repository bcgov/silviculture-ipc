<template>
  <v-container>
    <BaseSecure inspector>
      <router-link :to="{ name: 'Submission', params: { ipcPlanId: ipcPlanId } }">
        <v-btn color="primary" class="mt-5">Back</v-btn>
      </router-link>

      <StatusTable class="my-8" />
    </BaseSecure>
  </v-container>
</template>

<script>
import StatusTable from '@/components/admin/StatusTable.vue';

export default {
  name: 'Status',
  components: {
    StatusTable
  },
  data() {
    return {
      ipcPlanId: this.$route.params.ipcPlanId
    };
  }
};
</script>

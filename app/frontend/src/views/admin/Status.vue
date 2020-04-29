<template>
  <v-container>
    <BaseSecure inspector>
      <router-link :to="{ name: 'Admin' }">
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
  }
};
</script>

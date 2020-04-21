<template>
  <v-container>
    <BaseSecure submissions>
      <h1 class="my-8 text-center">Submissions</h1>
      <v-container>
        <v-row>
        </v-row>
      </v-container>
      <SubmissionsTable class="my-4" />
    </BaseSecure>
  </v-container>
</template>

<script>
import SubmissionsTable from '@/components/admin/SubmissionsTable.vue';

export default {
  name: 'Admin',
  components: {
    SubmissionsTable
  }
};
</script>

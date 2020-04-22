<template>
  <v-container>
    <BaseSecure admin>
      <h1 class="my-8 text-center">Admin</h1>
      <v-container>
        <v-row>
        </v-row>
      </v-container>
      <SubmissionsTable class="my-4" />
      <ApiTester class="my-4" />
    </BaseSecure>
  </v-container>
</template>

<script>
import SubmissionsTable from '@/components/admin/SubmissionsTable.vue';
import ApiTester from '@/components/admin/ApiTester.vue';


export default {
  name: 'Admin',
  components: {
    SubmissionsTable,
    ApiTester
  }
};
</script>

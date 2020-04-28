<template>
  <v-container>
    <BaseSecure>
      <SubmissionsTable class="my-8" />
    </BaseSecure>
  </v-container>
</template>

<script>
import SubmissionsTable from '@/components/admin/SubmissionsTable.vue';

export default {
  name: 'AdminRoot',
  components: {
    SubmissionsTable
  }
};
</script>

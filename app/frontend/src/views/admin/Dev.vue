<template>
  <v-container>
    <BaseSecure developer>
      <router-link :to="{ name: 'Admin'}">
        <v-btn color="primary" class="mt-5">Back</v-btn>
      </router-link>

      <ApiTester class="my-8" />
    </BaseSecure>
  </v-container>
</template>

<script>
import ApiTester from '@/components/admin/ApiTester.vue';

export default {
  name: 'Admin',
  components: {
    ApiTester
  }
};
</script>

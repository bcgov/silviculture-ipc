<template>
  <v-container>
    <BaseSecure>
      <h1 class="mt-6 text-center">Development</h1>
      <v-container>
        <ApiTester class="my-8" />
      </v-container>
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

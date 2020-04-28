<template>
  <v-container>
    <BaseSecure inspector>
      <router-link :to="{ name: 'Admin'}">
        <v-btn color="primary" class="mt-5">Back</v-btn>
      </router-link>
    </BaseSecure>
  </v-container>
</template>

<script>
export default {
  name: 'Status'
};
</script>

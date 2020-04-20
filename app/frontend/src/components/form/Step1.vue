<template>
  <v-container>
    <h2 class="pb-8">API Access for Common Services</h2>
    <p>Your application has a service client with access to:</p>
    <ul>
      <li>Common Hosted Email Service</li>
      <li>Common Document Generation Service</li>
    </ul>
    <h2 class="mt-8 pb-2">Service Client Status</h2>
    <p>
      * Available each service client in order:
      <strong>DEV - TEST - PROD</strong>
    </p>

    <v-container>
    </v-container>
  </v-container>
</template>

<script>

export default {
  name: 'Step1',
  computed: {
  },
  methods: {
    next() {
      return true;
    }
  }
};
</script>


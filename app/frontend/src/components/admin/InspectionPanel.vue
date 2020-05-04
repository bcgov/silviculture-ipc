<template>
  <v-container class="ipc-wrapper">
    <h2 class="mb-2">Inspection Status</h2>Current Status: Submitted
  </v-container>
</template>

<script>

export default {
  name: 'InspectionPanel',

  methods: {
    getInspectionData() {
      return true;
    }
  },
  mounted() {
    this.getInspectionData();
  }
};
</script>

<style scoped>
</style>

<template>
  <v-card outlined class="mx-auto inspection-panel">
    <h2 class="inspection-heading">Inspection Status</h2>
    <p>Current Status: Submitted</p>
  </v-card>
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

<style lang="scss" scoped>
.inspection-panel {
  background-color: #f5f5f5;
  font-size: smaller;
  margin-bottom: 2em;
  padding: 1em 1.5em;
  .inspection-heading {
    margin-bottom: 0.5em;
    color: #003366;
  }
}
</style>

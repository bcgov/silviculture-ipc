<template>
  <a v-on:click="generatePdf()" target="_blank">
    <slot></slot>
  </a>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'GeneratePdfButton',
  props: {
    ipcPlanId: {
      type: String,
      required: true
    }
  },
  methods: {
    generatePdf(){
      const pdf = `${Vue.prototype.$config.basePath}/${Vue.prototype.$config.apiPath}/ipc/pdf/${this.ipcPlanId}`;
      window.open(pdf, '_blank');
    },
  }
};
</script>

<style scoped>
a:hover {
  text-decoration: none !important;
}
</style>

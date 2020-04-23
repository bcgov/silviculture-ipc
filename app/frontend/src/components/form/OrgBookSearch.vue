<template>
  <v-autocomplete
    dense
    outlined
    flat
    solo
    :rules="rules"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    v-bind:value="value"
    v-on:change="$emit('change', $event.target.value)"
    hide-no-data
    hide-selected
    label="OrgBook Lookup"
    placeholder="Start typing to search the OrgBook database"
    prepend-icon="mdi-database-search"
    append-icon=""
  ></v-autocomplete>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'OrgBookSearch',
  props: {
    value: String,
    fieldRules: Array,
  },
  data() {
    return {
      isLoading: false,
      entries: [],
      search: null,
      rules: this.fieldRules,
    };
  },
  computed: {
    items() {
      return this.entries.map((entry) => {
        // there will only ever be 1 result in the names array
        return Object.assign({
          text: entry.names[0].text,
          value: entry.names[0].text,
        });
      });
    },
    apiURL() {
      if (Vue.prototype.$config) {
        const config = Vue.prototype.$config;
        return config.orgbook.endpoint;
      } else {
        throw new Error('Configuration object is missing.');
      }
    },
  },
  methods: {
    emitChange: function () {
      this.$emit('field-model', this.fieldModel);
    },
  },
  watch: {
    search(val) {
      // Minimum search length is 3 characters
      if (!val || val.length < 3) return;

      // A search has already been started
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load results
      fetch(
        `${this.apiURL}/search/autocomplete?q=${val}&inactive=false&latest=true&revoked=false`
      )
        .then((res) => res.json())
        .then((res) => {
          this.count = res.results.length;
          this.entries = res.results;
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>

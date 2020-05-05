<template>
  <div>
    <v-combobox
      dense
      outlined
      flat
      solo
      v-model="model"
      :rules="rules"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      v-on:change="change"
      v-on:blur="blur"
      clearable
      hide-no-data
      hide-selected
      label="OrgBook Lookup"
      placeholder="Start typing to search the OrgBook database"
      prepend-icon="mdi-database-search"
      append-icon
    ></v-combobox>
    <!-- warning box -->
    <BaseWarningCard v-if="showOrgBookWarning" class="mb-6">
      <h3>You have entered a Business Name that is not recognised by BC Registries.</h3>
      <p>This is no big deal.</p>
    </BaseWarningCard>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';

export default {
  name: 'OrgBookSearch',
  props: {
    fieldModel: String,
    fieldRules: Array,
  },
  data() {
    return {
      isLoading: false,
      entries: [],
      search: null,
      model: this.fieldModel,
      rules: this.fieldRules,
      showOrgBookWarning: false,
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
    change: function (value) {
      this.$emit(
        'update:field-model',
        // For this use, want to emit just the text
        typeof value === 'object' && value !== null ? value.text : value
      );
      // hide Org Book warning when user chooses from Org Book
      this.showOrgBookWarning = false;

    },
    blur(value) {
      const inputValue = value.srcElement._value;
      // get array of the suggestions from OrgBook
      const arrayOfOrgBookValues = this.entries.map( result => {
        return result.names[0].text;
      });
      // check if user input matched an Org Book suggestion
      this.showOrgBookWarning = (arrayOfOrgBookValues.includes(inputValue)) ? false : true;
    }
  },
  watch: {
    search(val) {
      // Minimum search length is 1 character
      if (!val || val.length < 1) return;

      // A search has already been started
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load results
      axios.get(
        `${this.apiURL}/search/autocomplete?q=${encodeURIComponent(
          val
        )}&inactive=false&latest=true&revoked=false`
      )
        .then((res) => {
          this.count = res.data.results.length;
          this.entries = res.data.results;
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

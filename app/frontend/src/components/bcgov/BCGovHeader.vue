<template>
  <header class="gov-header">
    <v-toolbar color="#003366" flat>
      <!-- Navbar content -->
      <router-link :to="{ name: home }" class="hidden-xs-only">
        <v-img
          alt="B.C. Government Logo"
          contain
          height="3.5rem"
          src="@/assets/images/17_gov3_bc_logo.svg"
          width="10rem"
        />
      </router-link>
      <router-link :to="{ name: home }">
        <v-toolbar-title class="title">{{ appTitle }}</v-toolbar-title>
      </router-link>
      <v-spacer />
      <BaseAuthButton />
    </v-toolbar>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import { SilvipcRoles } from '@/utils/constants';

export default {
  name: 'BCGovHeader',
  data() {
    return {
      role: { ...SilvipcRoles },
    };
  },
  computed: {
    ...mapGetters('auth', ['hasSilvipcRoles']),
    appTitle() {
      return process.env.VUE_APP_TITLE;
    },
    // clicking on banner logo or title goes to /home or /admin if an admin user
    home() {
      return (this.hasRole(this.role.INSPECTOR) & !this.hasRole(this.role.DEVELOPER)) ? 'Admin' : 'Home';
    }
  },
  methods: {
    hasRole(role) {
      return this.hasSilvipcRoles([role]);
    },
  }
};
</script>

<style scoped>
.gov-header {
  border-bottom: 2px solid #fcba19;
}

.title {
  color: #ffffff;
  padding: 1rem;
  cursor: pointer;
}
</style>

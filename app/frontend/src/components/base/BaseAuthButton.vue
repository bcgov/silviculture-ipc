<template>
  <div v-if="keycloakReady">
    <v-btn v-if="authenticated" dark outlined @click="logout">
      <span>Logout</span>
    </v-btn>
    <v-btn v-else dark outlined @click="login">
      <span class="hidden-sm-and-down">Login (Staff IDIR)</span>
      <span class="hidden-md-and-up"><v-icon>person</v-icon></span>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BaseAuthButton',
  computed: {
    ...mapGetters('auth', [
      'authenticated',
      'createLoginUrl',
      'createLogoutUrl',
      'keycloakReady'
    ])
  },
  methods: {
    login() {
      if (this.keycloakReady) {
        window.location.replace(
          this.createLoginUrl({
            redirectUri: location.origin + location.pathname + '/#/admin'
          })
        );
      }
    },
    logout() {
      if (this.keycloakReady) {
        window.location.replace(
          this.createLogoutUrl({
            redirectUri: location.origin + location.pathname
          })
        );
      }
    }
  }
};
</script>

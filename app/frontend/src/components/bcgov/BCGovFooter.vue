<template>
  <v-footer class="gov-footer">
    <v-btn text id="footer-home" @click="followFooterLink()">
      <span>Home</span>
    </v-btn>
    <v-btn text id="footer-about" href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca">
      <span>About gov.bc.ca</span>
    </v-btn>
    <v-btn text id="footer-disclaimer" href="http://gov.bc.ca/disclaimer">
      <span>Disclaimer</span>
    </v-btn>
    <v-btn text id="footer-privacy" href="http://gov.bc.ca/privacy">
      <span>Privacy</span>
    </v-btn>
    <v-btn text id="footer-accessibility" href="http://gov.bc.ca/webaccessibility">
      <span>Accessibility</span>
    </v-btn>
    <v-btn text id="footer-copyright" href="http://gov.bc.ca/copyright">
      <span>Copyright</span>
    </v-btn>
    <v-btn text id="footer-contact" href="https://www2.gov.bc.ca/gov/content/home/contact-us">
      <span>Contact Us</span>
    </v-btn>
    <v-spacer />
    <span class="app-version">v{{ appVersion }}</span>
  </v-footer>
</template>

<script>
import { mapGetters } from 'vuex';
import { SilvipcRoles } from '@/utils/constants';

export default {
  name: 'BCGovFooter',
  data() {
    return {
      role: { ...SilvipcRoles }
    };
  },
  computed: {
    ...mapGetters('auth', ['hasSilvipcRoles']),

    appVersion() {
      return process.env.VUE_APP_VERSION;
    }
  },
  methods: {
    hasRole(role) {
      return this.hasSilvipcRoles([role]);
    },
    // clicking on banner logo or title goes to /home or /admin if admin user
    followFooterLink() {
      if(this.hasRole(this.role.INSPECTOR) || this.hasRole(this.role.DEVELOPER)){
        this.$router.push({ name: 'Admin' }).catch(() => {});
      }
      else{
        this.$router.push({ name: 'Home' }).catch(() => {});
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.gov-footer {
  display: flex !important;
  a {
    color: #ffffff;
    font-size: 1rem;
    &:focus {
      outline: none;
    }
  }

  .v-btn {
    color: #ffffff;
    font-size: 1rem;
    text-decoration: none;
    text-transform: none;
    span > span {
      font-weight: normal;
    }
  }

  &.v-footer {
    background-color: #003366;
    border-top: 2px solid #fcba19;
    flex-shrink: 0;
    min-height: 2.5rem;
    min-width: 100%;
    padding-bottom: 0;
    padding-top: 0;
  }

  .app-version {
    font-size: smaller;
    color: white;
  }
}
</style>

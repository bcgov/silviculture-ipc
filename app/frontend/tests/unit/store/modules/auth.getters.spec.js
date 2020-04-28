import { cloneDeep } from 'lodash';
import { createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';

import authStore from '@/store/modules/auth';
import { SilvipcRoles } from '@/utils/constants';

const localVue = createLocalVue();
localVue.use(Vuex);

const zeroUuid = '00000000-0000-0000-0000-000000000000';

describe('auth getters', () => {
  let authenticated;
  let roles;
  let store;

  beforeEach(() => {
    authenticated = true;
    roles = [];
    store = new Vuex.Store(cloneDeep(authStore));

    Object.defineProperty(Vue.prototype, '$keycloak', {
      configurable: true, // Needed to allow deletions later
      get() {
        return {
          authenticated: authenticated,
          createLoginUrl: () => 'loginUrl',
          createLogoutUrl: () => 'logoutUrl',
          fullName: 'fName',
          ready: true,
          subject: zeroUuid,
          token: 'token',
          tokenParsed: {
            realm_access: {},
            resource_access: {
              silvipc: {
                roles: roles
              }
            }
          },
          userName: 'uName'
        };
      }
    });
  });

  afterEach(() => {
    if (Vue.prototype.$keycloak) {
      delete Vue.prototype.$keycloak;
    }
  });

  it('authenticated should return a boolean', () => {
    expect(store.getters.authenticated).toBeTruthy();
  });

  it('createLoginUrl should return a string', () => {
    expect(store.getters.createLoginUrl).toBeTruthy();
    expect(typeof store.getters.createLoginUrl).toBe('function');
    expect(store.getters.createLoginUrl()).toMatch('loginUrl');
  });

  it('createLogoutUrl should return a string', () => {
    expect(store.getters.createLogoutUrl).toBeTruthy();
    expect(typeof store.getters.createLogoutUrl).toBe('function');
    expect(store.getters.createLogoutUrl()).toMatch('logoutUrl');
  });

  it('fullName should return a string', () => {
    expect(store.getters.fullName).toBeTruthy();
    expect(store.getters.fullName).toMatch('fName');
  });

  it('hasSilvipcRoles should return false if unauthenticated', () => {
    authenticated = false;

    expect(store.getters.authenticated).toBeFalsy();
    expect(store.getters.hasSilvipcRoles(roles)).toBeFalsy();
  });

  it('hasSilvipcRoles should return true when developer exists', () => {
    authenticated = true;
    roles = [SilvipcRoles.DEVELOPER];

    expect(store.getters.authenticated).toBeTruthy();
    expect(store.getters.hasSilvipcRoles(roles)).toBeTruthy();
  });

  it('keycloakReady should return a boolean', () => {
    expect(store.getters.keycloakReady).toBeTruthy();
  });

  it('keycloakSubject should return a string', () => {
    expect(store.getters.keycloakSubject).toBeTruthy();
    expect(store.getters.keycloakSubject).toMatch(zeroUuid);
  });

  it('moduleLoaded should return a boolean', () => {
    expect(store.getters.moduleLoaded).toBeTruthy();
  });

  it('realmAccess should return an object', () => {
    expect(store.getters.realmAccess).toBeTruthy();
    expect(typeof store.getters.realmAccess).toBe('object');
  });

  it('resourceAccess should return an object', () => {
    expect(store.getters.resourceAccess).toBeTruthy();
    expect(typeof store.getters.resourceAccess).toBe('object');
  });

  it('token should return a string', () => {
    expect(store.getters.token).toBeTruthy();
    expect(store.getters.token).toMatch('token');
  });

  it('tokenParsed should return an object', () => {
    expect(store.getters.tokenParsed).toBeTruthy();
    expect(typeof store.getters.tokenParsed).toBe('object');
  });

  it('userName should return a string', () => {
    expect(store.getters.userName).toBeTruthy();
    expect(store.getters.userName).toMatch('uName');
  });
});
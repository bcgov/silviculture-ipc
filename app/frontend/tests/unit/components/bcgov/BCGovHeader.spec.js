import { shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import BCGovHeader from '@/components/bcgov/BCGovHeader.vue';

describe('BCGovHeader.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('renders', () => {
    const wrapper = shallowMount(BCGovHeader, {
      vuetify,
      stubs: ['BaseAuthButton'],
      computed: {
        home: 'Home'
      }
    });

    expect(wrapper.text()).toMatch('');
  });
});

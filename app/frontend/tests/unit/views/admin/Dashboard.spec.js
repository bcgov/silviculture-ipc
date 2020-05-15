import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import router from '@/router';
import PublicDashboard from '@/views/admin/PublicDashboard.vue';

const localVue = createLocalVue();
localVue.use(router);
localVue.use(Vuetify);

describe('PublicDashboard.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(PublicDashboard, {
      localVue,
      stubs: ['Dashboard', 'BaseSecure']
    });
    expect(wrapper.html()).toMatch('');
  });
});

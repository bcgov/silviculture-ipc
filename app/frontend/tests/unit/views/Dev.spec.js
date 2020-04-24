import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import Dev from '@/views/Dev.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('Admin.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(Dev, {
      localVue,
      stubs: ['ApiTester', 'BaseSecure']
    });

    expect(wrapper.html()).toMatch('Development');
  });
});

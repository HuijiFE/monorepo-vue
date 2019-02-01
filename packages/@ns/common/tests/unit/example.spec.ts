/**
 * Test example
 */

import { shallowMount, createLocalVue } from '@vue/test-utils';
import { Theme } from 'void-ui';
import Common, { NsHeader } from '@src/index';

describe('components/nav/header.tsx', () => {
  it('renders prop.theme for class name', () => {
    const localVue = createLocalVue();
    localVue.use(Common);
    const theme: Theme = 'dark';
    const wrapper = shallowMount(NsHeader, {
      localVue,
      propsData: { theme },
    });
    expect(wrapper.classes()).toMatch(`nsp-theme_${theme}`);
  });
});

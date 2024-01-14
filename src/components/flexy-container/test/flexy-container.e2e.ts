import { newE2EPage } from '@stencil/core/testing';

describe('flexy-container', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fxy-container></fxy-container>');

    const element = await page.find('fxy-container');
    expect(element).toHaveClass('hydrated');
  });
});

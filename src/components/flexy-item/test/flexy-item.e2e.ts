import { newE2EPage } from '@stencil/core/testing';

describe('flexy-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fxy-item></fxy-item>');

    const element = await page.find('fxy-item');
    expect(element).toHaveClass('hydrated');
  });
});

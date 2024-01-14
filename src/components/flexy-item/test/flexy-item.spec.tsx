import { newSpecPage } from '@stencil/core/testing';
import { FlexyItem } from '../flexy-item';

describe('flexy-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FlexyItem],
      html: `<fxy-item></fxy-item>`,
    });
    expect(page.root).toEqualHtml(`
      <fxy-item class="fxy-item" style="flex: 1 1 0%; box-sizing: border-box;">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </fxy-item>
    `);

    expect(page.rootInstance.fxyAlign).toBe('');
  });

  it('correctly parses fxy prop value', async () => {
    const page = await newSpecPage({
      components: [FlexyItem],
      html: `<fxy-item fxy="2 2 50%"></fxy-item>`,
    });
    expect(page.root.style.flex).toBe('2 2 50%');
  });

  it('applies default styles when fxy is empty', async () => {
    const page = await newSpecPage({
      components: [FlexyItem],
      html: `<fxy-item></fxy-item>`,
    });
    expect(page.root.style.flex).toBe('1 1 0%');
    expect(page.root.style.maxWidth).toBe('');
  });

  it('parses fxy prop as number to percentage', async () => {
    const page = await newSpecPage({
      components: [FlexyItem],
      html: `<fxy-item fxy="50"></fxy-item>`,
    });
    expect(page.root.style.flex).toBe('1 1 50%');
    expect(page.root.style.maxWidth).toBe('50%');
  });
  
  it('applies alignSelf correctly', async () => {
    const page = await newSpecPage({
      components: [FlexyItem],
      html: `<fxy-item fxy-align="center"></fxy-item>`,
    });
    expect(page.root.style.alignSelf).toBe('center');
  });
});

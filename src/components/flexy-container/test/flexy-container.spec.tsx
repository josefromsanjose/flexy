import { newSpecPage } from '@stencil/core/testing';
import { FlexyContainer } from '../flexy-container';

describe('flexy-container', () => {
  it('renders with default properties', async () => {
    const page = await newSpecPage({
      components: [FlexyContainer],
      html: `<fxy-container></fxy-container>`,
    });
    expect(page.root).toEqualHtml(`
      <fxy-container style="display: flex; flex-direction: row; align-items: stretch; place-content: stretch flex-start; box-sizing: border-box;">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </fxy-container>
    `);
    expect(page.rootInstance.fxyDirection).toBe('row');
    expect(page.rootInstance.fxyAlign).toBe("stretch flex-start");
    expect(page.rootInstance.fxyAlignItems).toBe("stretch");
    
    // ... other default prop checks ...
  });

  it('sets flex-direction based on fxyDirection prop', async () => {
    const page = await newSpecPage({
      components: [FlexyContainer],
      html: `<fxy-container fxy-direction="column"></fxy-container>`,
    });
    expect(page.root.style.flexDirection).toBe('column');
  });

  it('applies gap to child items', async () => {
    const page = await newSpecPage({
      components: [FlexyContainer],
      html: `<fxy-container fxy-gap="10px">
               <fxy-item></fxy-item>
               <fxy-item></fxy-item>
             </fxy-container>`,
    });
    const items = page.root.querySelectorAll('fxy-item');
    expect(items[0].style.marginRight).toBe('10px');
    expect(items[1].style.marginRight).toBe('');
  });

  it('applies fxyAlign property correctly', async () => {
    const page = await newSpecPage({
      components: [FlexyContainer],
      html: `<fxy-container fxy-align="center space-around"></fxy-container>`,
    });
    expect(page.root.style.placeContent).toBe('center space-around');
  });

  // Test for fxyWrap property
it('sets flex-wrap based on fxyWrap prop', async () => {
  const page = await newSpecPage({
    components: [FlexyContainer],
    html: `<fxy-container fxy-wrap="wrap"></fxy-container>`,
  });
  expect(page.root.style.flexWrap).toBe('wrap');
});

// Test for alignItems property
it('sets align-items based on alignItems prop', async () => {
  const page = await newSpecPage({
    components: [FlexyContainer],
    html: `<fxy-container fxy-align-items="center"></fxy-container>`,
  });
  expect(page.root.style.alignItems).toBe('center');
});

// Test for fxyFill property
it('applies full size styles when fxyFill is true', async () => {
  const page = await newSpecPage({
    components: [FlexyContainer],
    html: `<fxy-container fxy-fill="true"></fxy-container>`,
  });
  const expectedStyle = {
    height: '100%',
    minHeight: '100%',
    width: '100%',
    minWidth: '100%'
  };
  Object.keys(expectedStyle).forEach(key => {
    expect(page.root.style[key]).toBe(expectedStyle[key]);
  });
});

});

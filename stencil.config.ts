import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'flexy',
  plugins: [
    sass()
  ],
  // globalStyle: 'src/global/style.scss', // Updated to .scss
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // Disable service workers
    },
  ],
  testing: {
    browserHeadless: true,
  },
};

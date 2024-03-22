import type { Preview } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import '../index.css';
import { HelmetProvider } from 'react-helmet-async';
import React from 'react';

export const decorators = [
  // @ts-ignore
  (Story) => (
    <RecoilRoot>
      <BrowserRouter>
        <HelmetProvider>
          <Story />
        </HelmetProvider>
      </BrowserRouter>
    </RecoilRoot>
  ),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: decorators,
};

export default preview;

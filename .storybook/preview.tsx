import type {Preview} from '@storybook/react';
import {RecoilRoot} from "recoil";
import {BrowserRouter} from "react-router-dom";
import '../index.css';

export const decorators = [
  // @ts-ignore
  (Story) => (
    <RecoilRoot>
      <BrowserRouter>
        <Story />
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

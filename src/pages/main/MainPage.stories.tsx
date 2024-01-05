import MainPage from '@pages/main/MainPage';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'page/MainPage',
  component: MainPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof MainPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

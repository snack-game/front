import Header from '@components/Header/Header';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import Loading from '@components/Loading/Loading';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import Button from '@components/Button/Button';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <span>none</span>,
  },
};

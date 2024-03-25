import { Level } from './Level';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Level',
  component: Level,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Level>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    level: 20,
  },
};

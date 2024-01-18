import RouterLink from '@components/RouterLink/RouterLink';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/RouterLink',
  component: RouterLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof RouterLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    to: '#',
    children: <span>응가</span>,
  },
};

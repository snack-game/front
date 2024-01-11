import Modal from '@components/Modal/Modal';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div>Modal</div>,
  },
};

import DropDown from './DropDown';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/DropDown',
  component: DropDown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DropDown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      {
        name: 'good',
        onClick: () => {
          return;
        },
      },
      {
        name: 'bed',
        onClick: () => {
          return;
        },
      },
      {
        name: 'bed',
        onClick: () => {
          return;
        },
      },
    ],
    initalOption: 0,
  },
};

import Input from './Input';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fieldLabel: '라벨',
    valid: true,
    errorMessage: '에러 메시지',
  },
};

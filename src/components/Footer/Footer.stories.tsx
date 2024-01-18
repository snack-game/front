import Footer from '@components/Footer/Footer';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

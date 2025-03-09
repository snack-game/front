import Hero from '@components/Hero/Hero';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Hero',
  component: Hero,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '제목',
    desc: '설명',
    carouselImages: [],
    heroActions: <></>,
    heroVisual: <></>,
  },
};

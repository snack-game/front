import LogoImage from '@assets/images/main.png';
import Carousel from '@components/Carousel/Carousel';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { title: 'Apple Game', image: LogoImage },
      { title: 'Overwatch', image: LogoImage },
      { title: 'Overwatch', image: LogoImage },
      { title: 'Overwatch', image: LogoImage },
      { title: 'Overwatch', image: LogoImage },
    ],
    selected: 0,
  },
};

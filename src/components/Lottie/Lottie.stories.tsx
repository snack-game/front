import AppleGameLottie from '@assets/lottie/apple-game.json';
import Lottie from '@components/Lottie/Lottie';
import { LottieOptionTypes } from '@utils/types/common.type';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Lottie',
  component: Lottie,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Lottie>;

export default meta;

type Story = StoryObj<typeof meta>;

const lottieOptions: LottieOptionTypes = {
  animationData: AppleGameLottie,
  autoplay: true,
  loop: true,
};

export const Default: Story = {
  args: {
    lottieOptions,
    width: 400,
    height: 400,
  },
};

import React from 'react';
import { Link } from 'react-router-dom';

import { motion, Variants } from 'framer-motion';

import ComingSoonImage from '@assets/images/main.png';
import AppleGameLottie from '@assets/lottie/apple-game.json';
import Button from '@components/Button/Button';
import Lottie from '@components/Lottie/Lottie';
import { LottieOptionTypes } from '@utils/types/common.type';

import PATH from '@constants/path.constant';

interface HeroProps {
  selected: number;
}

const variants: Variants = {
  initial: {
    y: -60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const lottieOptions: LottieOptionTypes = {
  animationData: AppleGameLottie,
  autoplay: true,
  loop: true,
};

const heroContents = [
  {
    title: '사과게임',
    desc: '드래그 영역의 숫자 합이 10이 되도록 사과를 떨궈주세요!\n황금사과를 통해 판을 초기화하고 고득점을 노려보아요!',
    leftContent: (
      <>
        <Link to={PATH.APPLE_GAME}>
          <Button size={'lg'} className={'w-full'}>
            바로가기!
          </Button>
        </Link>
        <Link to={PATH.FEED_BACK} target={'_blank'}>
          <Button style={'border'} className={'w-full'}>
            피드백 보내기
          </Button>
        </Link>
      </>
    ),
    rightContent: <Lottie lottieOptions={lottieOptions} />,
  },

  {
    title: 'Coming Soon!',
    desc: 'Snack Game에서는 다양한 게임을 준비하고 있어요!\n다가올 게임들도 기대해 주세요!',
    leftContent: (
      <Link to={PATH.FEED_BACK} target={'_blank'}>
        <Button style={'border'} className={'w-full'}>
          피드백 보내기
        </Button>
      </Link>
    ),
    rightContent: (
      <img
        src={ComingSoonImage}
        alt={'main image'}
        className={'rounded-full bg-primary-light'}
      />
    ),
  },
];

const Hero = ({ selected }: HeroProps) => {
  const { title, desc, rightContent, leftContent } = heroContents[selected];

  return (
    <motion.div
      className="mx-auto mt-16 flex w-full max-w-7xl flex-col-reverse items-center justify-around p-2 lg:mt-0 lg:flex-row"
      key={selected}
    >
      <motion.div
        className={'flex flex-col gap-4 text-center lg:text-start'}
        variants={variants}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="h-14 text-3xl font-bold text-primary-deep-dark lg:text-5xl"
          variants={variants}
        >
          {title}
        </motion.div>
        <motion.div
          className="max-w-md whitespace-pre text-sm text-primary-dark lg:text-lg"
          variants={variants}
        >
          {desc}
        </motion.div>

        <motion.div variants={variants} className={'mt-2 flex flex-col gap-4'}>
          {leftContent}
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={
          'max-h-[250px] max-w-[250px] lg:max-h-[400px] lg:max-w-[400px]'
        }
      >
        {rightContent}
      </motion.div>
    </motion.div>
  );
};

export default Hero;

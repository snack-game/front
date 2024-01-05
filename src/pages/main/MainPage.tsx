import React from 'react';
import { useTranslation } from 'react-i18next';

import i18next from 'i18next';

import MainImage from '@assets/images/main.png';
import AppleGameLottie from '@assets/lottie/apple-game.json';
import Button from '@components/Button/Button';
import Carousel from '@components/Carousel/Carousel';
import Header from '@components/Header/Header';
import { LottieOptionTypes } from '@utils/types/common.type';

const lottieOptions: LottieOptionTypes = {
  animationData: AppleGameLottie,
  autoplay: true,
  loop: true,
};

const MainPage = () => {
  const { t } = useTranslation('main');
  console.log(i18next.language);

  return (
    <>
      <div className="h-screen">
        <Header />
        <div className="bg-primary-light mx-auto my-6 flex max-w-7xl flex-col p-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              By Blizzard Entertainment
            </span>
            <h1 className="text-6xl font-bold">{t('title')}</h1>
            <p className="max-w-md text-sm text-gray-300">
              Overwatch is a colorful team-based shooter game starring a diverse
              cast of powerful heroes. Travel the world, build a team, and
              contest objectives in exhilarating 6v6 combat.
            </p>
            <Button>Select Game</Button>
          </div>
          <div className={'max-h-[510px] w-[510px] rounded-full bg-white p-4'}>
            <img src={MainImage} alt={'main image'} />
          </div>
        </div>
        <div className={'mx-auto max-w-7xl'}>
          <Carousel
            items={[
              { title: 'Apple Game' },
              { title: 'Overwatch' },
              { title: 'Overwatch' },
              { title: 'Overwatch' },
              { title: 'Overwatch' },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default MainPage;

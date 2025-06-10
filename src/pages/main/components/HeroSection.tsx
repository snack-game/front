import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import AppleGameImage from '@assets/images/apple-game-image.avif';
import AppleGameWebpImage from '@assets/images/apple-game-image.webp';
import SnackGameImage from '@assets/images/logo-snack-game-letter.avif';
import SnackGameWebpImage from '@assets/images/logo-snack-game-letter.webp';
import ComingSoonImage from '@assets/images/main.avif';
import ComingSoonWebpImage from '@assets/images/main.webp';
import Button from '@components/Button/Button';
import Carousel from '@components/Carousel/Carousel';
import Hero from '@components/Hero/Hero';
import MovingSnack from '@components/Hero/MovingSnack';
import ImageWithFallback from '@components/ImageWithFallback/ImageWithFallback';

import PATH from '@constants/path.constant';

export interface HeroContent {
  title: string;
  desc: string;
  carouselImages: string[];
  heroActions: React.ReactNode;
  heroVisual: React.ReactNode;
}

const HeroSection = () => {
  const { t } = useTranslation(['landing']);
  const heroContents: HeroContent[] = [
    {
      title: t('snack_title'),
      desc: t('snack_desc'),
      carouselImages: [SnackGameImage, SnackGameWebpImage],
      heroActions: (
        <>
          <Link to={PATH.ONE_LINK} target={'_blank'}>
            <Button size={'lg'} className={'w-full'}>
              {t('install_app')}
            </Button>
          </Link>
          <Link to={PATH.SNACK_GAME}>
            <Button style={'border'} className={'w-full'}>
              {t('start')}
            </Button>
          </Link>
          <Link to={PATH.FEED_BACK} target={'_blank'}>
            <Button style={'border'} className={'w-full'}>
              {t('feedback')}
            </Button>
          </Link>
        </>
      ),
      heroVisual: <MovingSnack />,
    },
    {
      title: t('apple_title'),
      desc: t('apple_desc'),
      carouselImages: [AppleGameImage, AppleGameWebpImage],
      heroActions: (
        <>
          <Link to={PATH.APPLE_GAME} target={'_blank'}>
            <Button size={'lg'} className={'w-full'}>
              {t('start')}
            </Button>
          </Link>
          <Link to={PATH.FEED_BACK} target={'_blank'}>
            <Button style={'border'} className={'w-full'}>
              {t('feedback')}
            </Button>
          </Link>
        </>
      ),
      heroVisual: (
        <ImageWithFallback
          sources={[{ srcSet: AppleGameImage, type: 'avif' }]}
          src={AppleGameWebpImage}
          alt={'apple game image'}
          className={'rounded-full bg-primary-light'}
        />
      ),
    },
    {
      title: 'Coming Soon!',
      desc: t('coming_soon'),
      carouselImages: [ComingSoonImage, ComingSoonWebpImage],
      heroActions: (
        <Link to={PATH.FEED_BACK} target={'_blank'}>
          <Button style={'border'} className={'w-full'}>
            {t('feedback')}
          </Button>
        </Link>
      ),
      heroVisual: (
        <ImageWithFallback
          sources={[{ srcSet: ComingSoonImage, type: 'avif' }]}
          src={ComingSoonWebpImage}
          alt={'main image'}
          className={'rounded-full bg-primary-light'}
        />
      ),
    },
  ];
  const [selected, setSelected] = useState<number>(0);

  return (
    <section className={'flex min-h-screen flex-col bg-primary pb-12 pt-16'}>
      <div className={'flex h-full grow bg-white pt-4'}>
        <Hero {...heroContents[selected]} />
      </div>
      <div
        className={
          'rounded-b-3xl bg-white pt-10 shadow-md lg:rounded-b-full lg:pt-0'
        }
      >
        <Carousel
          items={heroContents}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </section>
  );
};

export default HeroSection;

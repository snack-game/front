import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

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
      title: t('title'),
      desc: t('desc'),
      carouselImages: [SnackGameImage, SnackGameWebpImage],
      heroActions: (
        <>
          <Link to={PATH.SNACK_GAME}>
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
      heroVisual: <MovingSnack />,
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
    <section
      className={
        'flex h-screen flex-col bg-primary py-12 landscape:min-h-screen '
      }
    >
      <div className={'flex h-full grow bg-white'}>
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

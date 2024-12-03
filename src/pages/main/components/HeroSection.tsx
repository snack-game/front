import { useState } from 'react';

import SnackGameImage from '@assets/images/logo-snack-game-letter.avif';
import SnackGameWebpImage from '@assets/images/logo-snack-game-letter.webp';
import ComingSoonImage from '@assets/images/main.avif';
import ComingSoonWebpImage from '@assets/images/main.webp';
import Carousel from '@components/Carousel/Carousel';
import Hero from '@components/Hero/Hero';

const HeroSection = () => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <section
      className={
        'flex h-screen flex-col bg-primary py-12 landscape:min-h-screen '
      }
    >
      <div className={'flex h-full grow bg-white'}>
        <Hero selected={selected} />
      </div>
      <div
        className={
          'rounded-b-3xl bg-white pt-10 shadow-md lg:rounded-b-full lg:pt-0'
        }
      >
        <Carousel
          items={[
            {
              title: 'Snack Game',
              images: [SnackGameImage, SnackGameWebpImage],
            },
            {
              title: 'Coming Soon',
              images: [ComingSoonImage, ComingSoonWebpImage],
            },
          ]}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </section>
  );
};

export default HeroSection;

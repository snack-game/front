import React, { useState } from 'react';

import AppleGameImage from '@assets/images/apple_game.png';
import ComingSoonImage from '@assets/images/main.png';
import Carousel from '@components/Carousel/Carousel';
import Hero from '@components/Hero/Hero';

const HeroSection = () => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <div className={'flex h-screen flex-col bg-primary py-12'}>
      <div className={'flex h-full bg-white'}>
        <Hero selected={selected} />
      </div>
      <div
        className={
          'rounded-b-3xl bg-white pt-10 shadow-md lg:rounded-b-full lg:pt-0'
        }
      >
        <Carousel
          items={[
            { title: 'Apple Game', image: AppleGameImage },
            { title: 'Coming Soon', image: ComingSoonImage },
          ]}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
};

export default HeroSection;
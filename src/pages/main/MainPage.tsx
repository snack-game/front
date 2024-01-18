import React from 'react';
import { Helmet } from 'react-helmet-async';

import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import SnackRainContainer from '@components/SnackRain/SnackRainContainer';
import Spacing from '@components/Spacing/Spacing';
import BlogSection from '@pages/main/components/BlogSection';
import HeroSection from '@pages/main/components/HeroSection';
import TeamSection from '@pages/main/components/TeamSection';

const MainPage = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Main</title>
      </Helmet>
      <SnackRainContainer />
      <Header className={'fixed'} />
      <div className="flex flex-col">
        <HeroSection />
        <Spacing size={10} />
        <BlogSection />
        <Spacing size={16} />
        <TeamSection />
      </div>
      <Footer />
    </>
  );
};

export default MainPage;

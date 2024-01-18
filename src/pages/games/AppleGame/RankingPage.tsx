import React from 'react';
import { Helmet } from 'react-helmet-async';

import Footer from '@components/Footer/Footer';
import Spacing from '@components/Spacing/Spacing';
import AppleGameHeader from '@pages/games/AppleGame/components/AppleGameHeader';
import RankingSection from '@pages/games/AppleGame/components/RankingSection';

const RankingPage = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Ranking</title>
      </Helmet>

      <AppleGameHeader />
      <Spacing size={8} />
      <RankingSection />
      <Footer />
    </>
  );
};

export default RankingPage;

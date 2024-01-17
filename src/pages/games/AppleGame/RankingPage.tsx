import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useRecoilValue } from 'recoil';

import Footer from '@components/Footer/Footer';
import Spacing from '@components/Spacing/Spacing';
import AppleGameHeader from '@pages/games/AppleGame/components/AppleGameHeader';
import RankingSection from '@pages/games/AppleGame/components/RankingSection';
import { userState } from '@utils/atoms/member.atom';

const RankingPage = () => {
  const userStateValue = useRecoilValue(userState);

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

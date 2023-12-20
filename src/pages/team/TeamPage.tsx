import React from 'react';
import { Helmet } from 'react-helmet-async';

import PageContainer from '@components/base/PageContainer';
import SnackRainContainer from '@components/ui/SnackRain/SnackRainContainer';
import TeamInfo from '@components/ui/TeamInfo/TeamInfo';

const TeamPage = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Team Info</title>
      </Helmet>
      <SnackRainContainer />
      <PageContainer>
        <TeamInfo />
      </PageContainer>
    </>
  );
};

export default TeamPage;

import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import PageContainer from '@components/base/PageContainer';
import AppleGameBase from '@components/games/apple-game/AppleGameBase';
import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';

interface AppleGamePageProps {
  children?: never;
}

const AppleGamePage: FC<AppleGamePageProps> = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Apple Game</title>
      </Helmet>
      <Header />
      <PageContainer>
        <AppleGameBase />
      </PageContainer>
      <Footer></Footer>
    </>
  );
};

export default AppleGamePage;

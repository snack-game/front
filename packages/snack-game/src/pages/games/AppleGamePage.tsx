import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import PageContainer from '@components/base/PageContainer';
import AppleGameContainer from '@components/games/AppleGameContainer';

interface AppleGamePageProps {
  children?: never;
}

const AppleGamePage: FC<AppleGamePageProps> = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Apple Game</title>
      </Helmet>
      <PageContainer>
        <AppleGameContainer />
      </PageContainer>
    </>
  );
};

export default AppleGamePage;

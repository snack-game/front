import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import AppleGameContainer from '@components/base/AppleGameContainer';
import PageContainer from '@components/base/PageContainer';

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

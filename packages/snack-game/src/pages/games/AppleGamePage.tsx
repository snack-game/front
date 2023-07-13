import { Helmet } from 'react-helmet-async';

import PageContainer from '@components/base/PageContainer';
import AppleGameContainer from '@components/games/AppleGameContainer';

const AppleGamePage = () => {
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

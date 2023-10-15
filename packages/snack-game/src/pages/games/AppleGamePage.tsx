import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import PageContainer from '@components/base/PageContainer';
import QueryBoundary from '@components/base/QueryBoundary';
import RetryError from '@components/common/Error/RetryError';
import AppleGameContainer from '@components/games/AppleGameContainer';

const AppleGamePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Snack Game || Apple Game</title>
      </Helmet>
      <PageContainer>
        <QueryBoundary errorFallback={RetryError}>
          <AppleGameContainer />
        </QueryBoundary>
      </PageContainer>
    </>
  );
};

export default AppleGamePage;

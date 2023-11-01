import React from 'react';
import { Helmet } from 'react-helmet-async';

import PageContainer from '@components/base/PageContainer';
import QueryBoundary from '@components/base/QueryBoundary';
import RetryError from '@components/common/Error/RetryError';
import SnackRainContainer from '@components/ui/SnackRain/SnackRainContainer';
import UserInfo from '@components/ui/UserInfo/UserInfo';

const UserPage = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || My Info</title>
      </Helmet>
      <SnackRainContainer />
      <PageContainer>
        <QueryBoundary errorFallback={RetryError}>
          <UserInfo />
        </QueryBoundary>
      </PageContainer>
    </>
  );
};

export default UserPage;

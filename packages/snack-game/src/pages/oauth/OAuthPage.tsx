import React from 'react';
import { Helmet } from 'react-helmet-async';

import QueryBoundary from '@components/base/QueryBoundary';
import OAuthHandler from '@components/ui/AuthForm/OAuthHandler';
import ErrorPage from '@pages/error/ErrorPage';

const OAuthPage = () => {
  return (
    <QueryBoundary errorFallback={ErrorPage}>
      <>
        <Helmet>
          <title>Snack Game || OAuth</title>
        </Helmet>
        <OAuthHandler />
      </>
    </QueryBoundary>
  );
};

export default OAuthPage;

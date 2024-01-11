import React from 'react';
import { Helmet } from 'react-helmet-async';

import ErrorBoundary from '@components/base/ErrorBoundary';
import retryError from '@components/Error/RetryError';
import DefaultMode from '@game/view/DefaultMode';
import AppleGameHeader from '@pages/games/AppleGame/components/AppleGameHeader';

const AppleGamePage = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Apple Game</title>
      </Helmet>

      <AppleGameHeader />

      <ErrorBoundary fallback={retryError}>
        <DefaultMode />
      </ErrorBoundary>
    </>
  );
};

export default AppleGamePage;

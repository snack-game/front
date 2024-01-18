import React from 'react';
import { Helmet } from 'react-helmet-async';

import ErrorBoundary from '@components/base/ErrorBoundary';
import retryError from '@components/Error/RetryError';
import Spacing from '@components/Spacing/Spacing';
import AppleGameHeader from '@pages/games/AppleGame/components/AppleGameHeader';
import DefaultMode from '@pages/games/AppleGame/game/view/DefaultMode';

const AppleGamePage = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Apple Game</title>
      </Helmet>

      <div className={'h-screen'}>
        <AppleGameHeader />

        <Spacing size={2} />

        <ErrorBoundary fallback={retryError}>
          <DefaultMode />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default AppleGamePage;

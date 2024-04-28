import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import ErrorBoundary from '@components/base/ErrorBoundary';
import Button from '@components/Button/Button';
import retryError from '@components/Error/RetryError';

import { SnackGameC } from './model/snackGame/snackGameC';
import { SnackGameD } from './model/snackGame/snackGameD';
import NewSnackGameMod from './view/snackGame/NewSnackGameMod';

type Mode = 'default' | 'inf';

const AppleGamePage = () => {
  const [modeState, setModeState] = useState<Mode>('default');

  const renderGameMode = () => {
    switch (modeState) {
      case 'default':
        return SnackGameD;
      case 'inf':
        return SnackGameC;
    }
  };

  return (
    <>
      <Helmet>
        <title>Snack Game || Apple Game</title>
      </Helmet>

      <div className={'h-screen'}>
        <ErrorBoundary fallback={retryError}>
          <NewSnackGameMod snackGameLogic={renderGameMode()} />
        </ErrorBoundary>
      </div>

      <div className="flex w-full max-w-4xl flex-wrap justify-center gap-8 py-10">
        <Button
          onClick={() => setModeState('default')}
          className={modeState === 'default' ? 'bg-primary-dark' : ''}
        >
          일반 모드
        </Button>
        <Button
          onClick={() => setModeState('inf')}
          className={modeState === 'inf' ? 'bg-primary-dark' : ''}
        >
          무한 모드
        </Button>
      </div>
    </>
  );
};

export default AppleGamePage;

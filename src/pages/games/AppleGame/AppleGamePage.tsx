import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import ErrorBoundary from '@components/base/ErrorBoundary';
import Button from '@components/Button/Button';
import retryError from '@components/Error/RetryError';
import Footer from '@components/Footer/Footer';
import AppleGameHeader from '@pages/games/AppleGame/components/AppleGameHeader';
import ClassicMode from '@pages/games/AppleGame/game/view/appleGame/ClassicMode';
import DefaultMode from '@pages/games/AppleGame/game/view/appleGame/DefaultMode';

import SnackGameModC from './game/view/snackGame/SnackGameModC';
import SnackGameModD from './game/view/snackGame/SnackGameModD';
import SnackGameMode from './game/view/snackGame/SnackGameMode';
import SnackGameModeB from './game/view/snackGame/SnackGameModeB';

type Mode =
  | 'classic'
  | 'default'
  | 'practice'
  | 'new'
  | 'new_mode_b'
  | 'new_mode_c'
  | 'new_mode_d';

const AppleGamePage = () => {
  const [modeState, setModeState] = useState<Mode>('new_mode_d');

  const renderGameMode = () => {
    switch (modeState) {
      case 'classic':
        return <ClassicMode />;
      case 'new':
        return <SnackGameMode />;
      case 'default':
        return <DefaultMode />;
      case 'new_mode_b':
        return <SnackGameModeB />;
      case 'new_mode_c':
        return <SnackGameModC />;
      case 'new_mode_d':
        return <SnackGameModD />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Snack Game || Apple Game</title>
      </Helmet>

      <div className={'h-screen'}>
        <ErrorBoundary fallback={retryError}>{renderGameMode()}</ErrorBoundary>
      </div>

      {/* <div className="flex w-full max-w-4xl flex-wrap justify-center gap-8 py-10">
        <Button
          onClick={() => setModeState('new_mode_c')}
          className={modeState === 'new_mode_c' ? 'bg-primary-dark' : ''}
        >
          신규 모드 C
        </Button>
        <Button
          onClick={() => setModeState('new_mode_d')}
          className={modeState === 'new_mode_d' ? 'bg-primary-dark' : ''}
        >
          신규 모드 D
        </Button>
      </div> */}
    </>
  );
};

export default AppleGamePage;

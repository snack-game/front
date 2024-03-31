import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import ErrorBoundary from '@components/base/ErrorBoundary';
import Button from '@components/Button/Button';
import retryError from '@components/Error/RetryError';
import Footer from '@components/Footer/Footer';
import Spacing from '@components/Spacing/Spacing';
import AppleGameHeader from '@pages/games/AppleGame/components/AppleGameHeader';
import ClassicMode from '@pages/games/AppleGame/game/view/ClassicMode';
import DefaultMode from '@pages/games/AppleGame/game/view/DefaultMode';

import SnackGameMode from './game/view/SnackGameMode';

type Mode = 'classic' | 'default' | 'practice' | 'new';

const AppleGamePage = () => {
  const [modeState, setModeState] = useState<Mode>('default');

  const renderGameMode = () => {
    switch (modeState) {
      case 'classic':
        return <ClassicMode />;
      case 'new':
        return <SnackGameMode />;
      case 'default':
      default:
        return <DefaultMode />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Snack Game || Apple Game</title>
      </Helmet>

      <div className={'h-screen'}>
        <AppleGameHeader />
        <ErrorBoundary fallback={retryError}>{renderGameMode()}</ErrorBoundary>
      </div>

      <div className="mx-auto flex w-full max-w-4xl justify-center gap-8 py-10">
        <Button
          onClick={() => setModeState('default')}
          className={modeState === 'default' ? 'bg-primary-dark' : ''}
        >
          일반 모드
        </Button>
        <Button
          onClick={() => setModeState('classic')}
          className={modeState === 'classic' ? 'bg-primary-dark' : ''}
        >
          클래식 모드
        </Button>
        <Button
          onClick={() => setModeState('new')}
          className={modeState === 'new' ? 'bg-primary-dark' : ''}
        >
          신규 모드
        </Button>
      </div>

      <Footer />
    </>
  );
};

export default AppleGamePage;

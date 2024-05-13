import { Helmet } from 'react-helmet-async';

import ErrorBoundary from '@components/base/ErrorBoundary';
import retryError from '@components/Error/RetryError';

import SnackGameBase from './pixi/SnackGameBase';
import NewSnackGameMod from './view/snackGame/NewSnackGameMod';

const SnackGamePage = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Apple Game</title>
      </Helmet>

      <div className={'h-screen bg-game'}>
        <ErrorBoundary fallback={retryError}>
          <SnackGameBase />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default SnackGamePage;

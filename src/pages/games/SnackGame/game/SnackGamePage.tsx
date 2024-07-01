import { Helmet } from 'react-helmet-async';

import { useRecoilValue } from 'recoil';

import ErrorBoundary from '@components/base/ErrorBoundary';
import retryError from '@components/Error/RetryError';
import { pixiState } from '@utils/atoms/game.atom';

import { LobbyScreen } from './screen/LobbyScreen';
import SnackGameBase from './SnackGameBase';
import { navigation } from './util/navigation';

const SnackGamePage = () => {
  const pixiValue = useRecoilValue(pixiState);

  const handleRetryGameError = () => {
    if (pixiValue.assetsInit && pixiValue.pixiInit) {
      navigation.showScreen(LobbyScreen);
    }
  };

  return (
    <>
      <Helmet>
        <title>Snack Game || Apple Game</title>
      </Helmet>

      <div className={'h-screen bg-game'}>
        <ErrorBoundary fallback={retryError} onReset={handleRetryGameError}>
          <SnackGameBase />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default SnackGamePage;

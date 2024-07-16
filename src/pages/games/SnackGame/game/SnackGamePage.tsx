import { Helmet } from 'react-helmet-async';

import ErrorBoundary from '@components/base/ErrorBoundary';
import RetryError from '@components/Error/RetryError';

import SnackGameBase from './SnackGameBase';

const SnackGamePage = () => {
  let errorHandler = () => {
    console.log('SnackgameBase 초기화 전 오류가 발생했습니다');
  };
  const replaceErrorHandler = (handler: () => void) => (errorHandler = handler);

  return (
    <>
      <Helmet>
        <title>Snack Game || Snack Game</title>
      </Helmet>

      <div className={'h-screen bg-game'}>
        <ErrorBoundary fallback={RetryError} onReset={errorHandler}>
          <SnackGameBase replaceErrorHandler={replaceErrorHandler} />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default SnackGamePage;

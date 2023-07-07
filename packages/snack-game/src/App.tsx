import { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Global } from '@emotion/react';

import ErrorBoundary from '@components/base/ErrorBoundary';
import Loading from '@components/common/Loading';

import { globalStyles } from './App.style';

const MainPage = lazy(() => import('@pages/MainPage'));
const AuthPage = lazy(() => import('@pages/AuthPage'));

const AppleGamePage = lazy(() => import('@pages/games/AppleGamePage'));

interface AppProps {
  children?: never;
}

const App: FC<AppProps> = () => {
  return (
    <>
      <ErrorBoundary>
        <Global styles={globalStyles} />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/auth" element={<AuthPage />} />

            {/*Game*/}
            <Route path="/game/apple-game" element={<AppleGamePage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default App;

import { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from '@components/base/ErrorBoundary';
import Loading from '@components/common/Loading';

const MainPage = lazy(() => import('@pages/MainPage'));

const AppleGamePage = lazy(() => import('@pages/Games/AppleGamePage'));

interface AppProps {
  children?: never;
}

const App: FC<AppProps> = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/game/apple-game" element={<AppleGamePage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default App;

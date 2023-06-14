import { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from '@components/base/ErrorBoundary';

const MainPage = lazy(() => import('@pages/MainPage'));
const GamePage = lazy(() => import('@pages/AppleGame'));

interface AppProps {
  children?: never;
}

const App: FC<AppProps> = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;

import { FC, lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';

import { Global } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import RecoilizeDebugger from 'recoilize';

import ErrorBoundary from '@components/base/ErrorBoundary';
import Toast from '@components/base/Toast';
import Loading from '@components/common/Loading';

import { globalStyles } from './App.style';

const MainPage = lazy(() => import('@pages/MainPage'));

const RegisterPage = lazy(() => import('@pages/auth/RegisterPage'));

const AppleGamePage = lazy(() => import('@pages/games/AppleGamePage'));

const queryClient = new QueryClient();

interface AppProps {
  children?: never;
}

const App: FC<AppProps> = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <RecoilizeDebugger />
          <ErrorBoundary>
            <Global styles={globalStyles} />
            <Suspense fallback={<Loading type={'page'} />}>
              <Routes>
                <Route path="/" element={<MainPage />} />

                {/*Auth*/}
                <Route path="/register" element={<RegisterPage />} />

                {/*Game*/}
                <Route path="/game/apple-game" element={<AppleGamePage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
          <Toast />
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
};

export default App;

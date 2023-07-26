import { FC, lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';

import { Global, ThemeProvider } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import RecoilizeDebugger from 'recoilize';

import ErrorBoundary from '@components/base/ErrorBoundary';
import Loading from '@components/common/Loading';
import Toast from '@components/common/Toast';
import theme from '@utils/theme';

import PATH from '@constants/path.constant';

import { globalStyles } from './App.style';

const MainPage = lazy(() => import('@pages/MainPage'));

const AuthPage = lazy(() => import('@pages/auth/AuthPage'));

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
          <ThemeProvider theme={theme}>
            <ErrorBoundary>
              <Global styles={globalStyles} />
              <Suspense fallback={<Loading type={'page'} />}>
                <Routes>
                  <Route path={PATH.HOME} element={<MainPage />} />

                  {/*Auth*/}
                  <Route path={PATH.AUTH} element={<AuthPage />} />

                  {/*Game*/}
                  <Route path={PATH.APPLE_GAME} element={<AppleGamePage />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
            <Toast />
          </ThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
};

export default App;

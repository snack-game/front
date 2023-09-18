import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Routes } from 'react-router-dom';

import { Global, ThemeProvider } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import RecoilizeDebugger from 'recoilize';

import ErrorBoundary from '@components/base/ErrorBoundary';
import Loading from '@components/common/Loading';
import Modal from '@components/common/Modal/Modal';
import Toast from '@components/common/Toast';
import errorPage from '@pages/error/ErrorPage';
import theme from '@utils/theme';

import PATH from '@constants/path.constant';

import { globalStyles } from './App.style';

const MainPage = lazy(() => import('@pages/main/MainPage'));

const AppleGamePage = lazy(() => import('@pages/games/AppleGamePage'));

const RankingPage = lazy(() => import('@pages/ranking/RankingPage'));

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <RecoilizeDebugger />
          <ThemeProvider theme={theme}>
            <ErrorBoundary fallback={errorPage}>
              <Global styles={globalStyles} />
              <Suspense fallback={<Loading type={'page'} />}>
                <Routes>
                  <Route path={PATH.HOME} element={<MainPage />} />

                  {/*Game*/}
                  <Route path={PATH.APPLE_GAME} element={<AppleGamePage />} />

                  {/*RANKING*/}
                  <Route path={PATH.RANKING} element={<RankingPage />} />
                </Routes>
              </Suspense>
              <Modal />
              <Toast />
            </ErrorBoundary>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
};

export default App;

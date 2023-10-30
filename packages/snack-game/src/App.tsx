import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Global, ThemeProvider } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import ErrorBoundary from '@components/base/ErrorBoundary';
import Loading from '@components/common/Loading/Loading';
import Modal from '@components/common/Modal/Modal';
import Toast from '@components/ui/Toast/Toast';
import errorPage from '@pages/error/ErrorPage';
import { themeState } from '@utils/atoms/common.atom';
import { darkTheme, lightTheme } from '@utils/theme';

import PATH from '@constants/path.constant';

import { globalStyles } from './App.style';

const MainPage = lazy(() => import('@pages/main/MainPage'));

const AppleGamePage = lazy(() => import('@pages/games/AppleGamePage'));

const LeaderBoardPage = lazy(
  () => import('@pages/leaderboard/LeaderBoardPage'),
);

const TeamPage = lazy(() => import('@pages/team/TeamPage'));

const UserPage = lazy(() => import('@pages/user/UserPage'));

const App = () => {
  const themeStateValue = useRecoilValue(themeState);

  return (
    <>
      <ThemeProvider
        theme={themeStateValue === 'light' ? lightTheme : darkTheme}
      >
        <ErrorBoundary fallback={errorPage}>
          <Global styles={globalStyles(themeStateValue)} />
          <Suspense fallback={<Loading type={'page'} />}>
            <Routes>
              {/*Main*/}
              <Route path={PATH.HOME} element={<MainPage />} />

              {/*Game*/}
              <Route path={PATH.APPLE_GAME} element={<AppleGamePage />} />

              {/*RANKING*/}
              <Route path={PATH.RANKING} element={<LeaderBoardPage />} />

              {/*TEAM*/}
              <Route path={PATH.TEAM} element={<TeamPage />} />

              {/*User*/}
              <Route path={PATH.USER} element={<UserPage />} />
            </Routes>
          </Suspense>
          <Modal />
          <Toast />
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
};

export default App;

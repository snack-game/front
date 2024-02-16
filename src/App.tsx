import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { inject } from '@vercel/analytics';

import ErrorBoundary from '@components/base/ErrorBoundary';
import Loading from '@components/Loading/Loading';
import Modal from '@components/Modal/Modal';
import Toast from '@components/Toast/Toast';

import PATH from '@constants/path.constant';

inject();

const MainPage = lazy(() => import('@pages/main/MainPage'));

const AppleGamePage = lazy(
  () => import('@pages/games/AppleGame/AppleGamePage'),
);

const RankingPage = lazy(() => import('@pages/games/AppleGame/RankingPage'));

const PolicyPage = lazy(() => import('@pages/policy/Policy'));

const OAuthPage = lazy(() => import('@pages/oauth/OAuthPage'));

const ErrorPage = lazy(() => import('@pages/error/ErrorPage'));

const UserPage = lazy(() => import('@pages/user/UserPage'));

const App = () => {
  return (
    <>
      <ErrorBoundary fallback={ErrorPage}>
        <Suspense fallback={<Loading type={'page'} />}>
          <Routes>
            {/*Main*/}
            <Route path={PATH.MAIN} element={<MainPage />} />

            {/*Game*/}
            <Route path={PATH.APPLE_GAME} element={<AppleGamePage />} />

            {/*RANKING*/}
            <Route path={PATH.APPLE_GAME_RANKING} element={<RankingPage />} />

            <Route path={PATH.POLICY} element={<PolicyPage />} />

            {/* User */}
            <Route path={PATH.USER} element={<UserPage />} />

            {/*OAuth*/}
            <Route path={PATH.OAUTH_SUCCESS} element={<OAuthPage />} />
            <Route
              path={PATH.OAUTH_FAILURE}
              element={<ErrorPage message={'소셜 로그인에 실패했습니다.'} />}
            />

            {/*Error*/}
            <Route
              path={PATH.NOT_FOUND_ERROR}
              element={
                <ErrorPage code={404} message={'존재하지 않는 페이지입니다!'} />
              }
            />
          </Routes>
        </Suspense>
        <Modal />
        <Toast />
      </ErrorBoundary>
    </>
  );
};

export default App;

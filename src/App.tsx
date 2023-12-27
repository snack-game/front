import React, {lazy, Suspense, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';

import {inject} from '@vercel/analytics';
import {useRecoilValue, useResetRecoilState} from 'recoil';

import ErrorBoundary from '@components/base/ErrorBoundary';
import Loading from '@components/common/Loading/Loading';
import Modal from '@components/common/Modal/Modal';
import Toast from '@components/ui/Toast/Toast';
import {resetUserState, userState} from '@utils/atoms/member.atom';

import PATH from '@constants/path.constant';
import '@utils/locales/i18n';

inject();

const MainPage = lazy(() => import('@pages/main/MainPage'));

const AppleGamePage = lazy(() => import('@pages/games/AppleGamePage'));

const LeaderBoardPage = lazy(() => import('@pages/ranking/RankingPage'));

const TeamPage = lazy(() => import('@pages/team/TeamPage'));

const UserPage = lazy(() => import('@pages/user/UserPage'));

const OAuthPage = lazy(() => import('@pages/oauth/OAuthPage'));

const ErrorPage = lazy(() => import('@pages/error/ErrorPage'));

const App = () => {
  const userStateValue = useRecoilValue(userState);
  const resetUser = useResetRecoilState(resetUserState);

  useEffect(() => {
    if (!userStateValue.member) {
      resetUser();
    }
  }, []);

  return (
    <>
      <ErrorBoundary fallback={ErrorPage}>
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
                <ErrorPage
                  code={404}
                  message={'존재하지 않는 페이지입니다!'}
                />
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

import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { inject } from '@vercel/analytics';
import { useResetRecoilState } from 'recoil';

import ErrorBoundary from '@components/base/ErrorBoundary';
import Loading from '@components/Loading/Loading';
import Modal from '@components/Modal/Modal';
import Toast from '@components/Toast/Toast';
import { AuthPage } from '@pages/auth/AuthPage';
import GameLayout from '@pages/GameLayout';
import { resetUserState } from '@utils/atoms/member.atom';

import { LOCAL_STORAGE_KEY } from '@constants/localStorage.constant';
import PATH from '@constants/path.constant';
import useLocalStorage from '@hooks/useLocalStorage';

inject();

const MainPage = lazy(() => import('@pages/main/MainPage'));

const SnackGamePage = lazy(
  () => import('@pages/games/SnackGame/game/SnackGamePage'),
);

const RankingPage = lazy(
  () => import('@pages/games/SnackGame/ranking/RankingPage'),
);

const PolicyPage = lazy(() => import('@pages/policy/Policy'));

const OAuthPage = lazy(() => import('@pages/oauth/OAuthPage'));

const ErrorPage = lazy(() => import('@pages/error/ErrorPage'));

const UserPage = lazy(() => import('@pages/user/UserPage'));

const SettingPage = lazy(() => import('@pages/user/setting/SettingPage'));

const App = () => {
  const resetUser = useResetRecoilState(resetUserState);
  const { storageValue, deleteStorageValue } = useLocalStorage<string>({
    key: LOCAL_STORAGE_KEY.USER_EXPIRE_TIME,
  });
  const { deleteStorageValue: deleteUserPersistState } =
    useLocalStorage<string>({
      key: 'userPersistState',
    });

  useEffect(() => {
    const checkUserExpired = () => {
      if (!storageValue) return;

      const currentTime = Date.now();
      const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;
      const expireTime = parseInt(storageValue, 10);

      if (expireTime && currentTime - expireTime > oneMonthInMilliseconds) {
        resetUser();
        deleteUserPersistState();
        deleteStorageValue();
      }
    };

    checkUserExpired();
  }, []);

  return (
    <>
      <ErrorBoundary fallback={ErrorPage}>
        <Suspense fallback={<Loading type={'page'} />}>
          <Routes>
            {/*Main*/}
            <Route path={PATH.MAIN} element={<MainPage />} />

            <Route path={PATH.AUTH} element={<AuthPage />} />

            {/*OAuth*/}
            <Route path={PATH.OAUTH_SUCCESS} element={<OAuthPage />} />
            <Route
              path={PATH.OAUTH_FAILURE}
              element={<ErrorPage message={'소셜 로그인에 실패했습니다.'} />}
            />

            <Route element={<GameLayout />}>
              {/*Game*/}
              <Route path={PATH.SNACK_GAME} element={<SnackGamePage />} />

              {/*RANKING*/}
              <Route path={PATH.SNACK_GAME_RANKING} element={<RankingPage />} />

              <Route path={PATH.POLICY} element={<PolicyPage />} />

              {/* User */}
              <Route path={PATH.USER} element={<UserPage />} />
            </Route>

            {/*Setting*/}
            <Route path={PATH.SETTING} element={<SettingPage />} />

            {/*Error*/}
            <Route
              path={PATH.NOT_FOUND_ERROR}
              element={
                <ErrorPage code={404} message={'존재하지 않는 페이지입니다!'} />
              }
            />
          </Routes>
          <Modal />
        </Suspense>
        <Toast />
      </ErrorBoundary>
    </>
  );
};

export default App;

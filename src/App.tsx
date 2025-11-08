import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useResetRecoilState, useSetRecoilState } from 'recoil';

// import { getMemberProfile } from '@api/members.api';
import ErrorBoundary from '@components/base/ErrorBoundary';
import Loading from '@components/Loading/Loading';
import Modal from '@components/Modal/Modal';
import Toast from '@components/Toast/Toast';
import GameLayout from '@pages/GameLayout';
import { PrivateRoute } from '@pages/PrivateRoute';
import { resetUserState, userState } from '@utils/atoms/member.atom';

import PATH from '@constants/path.constant';
import useLocalStorage from '@hooks/useLocalStorage';

import '@utils/i18n/i18n';

const MainPage = lazy(() => import('@pages/main/MainPage'));

// TODO: 서버 마이그레이션 완료 후 아래 ServiceMaintenancePage 주석 처리하고 실제 페이지들 주석 해제
const ServiceMaintenancePage = lazy(
  () => import('@pages/maintenance/ServiceMaintenancePage'),
);

// const SnackGamePage = lazy(
//   () => import('@pages/games/SnackGame/game/SnackGamePage'),
// );
// const SnackGameBizPage = lazy(
//   () => import('@pages/games/SnackgameBiz/SnackGameBizPage'),
// );
// const AppleGamePage = lazy(
//   () => import('@pages/games/AppleGame/view/appleGame/DefaultMode'),
// );
// const RankingPage = lazy(
//   () => import('@pages/games/SnackGame/ranking/RankingPage'),
// );
// const PolicyPage = lazy(() => import('@pages/policy/Policy'));
// const OAuthPage = lazy(() => import('@pages/oauth/OAuthPage'));
const ErrorPage = lazy(() => import('@pages/error/ErrorPage'));
// const UserPage = lazy(() => import('@pages/user/UserPage'));
// const SettingPage = lazy(() => import('@pages/user/setting/SettingPage'));
// const WithdrawPage = lazy(() => import('@pages/withdraw/WithdrawPage'));
// const NoticePage = lazy(() => import('@pages/user/notice/NoticePage'));

const App = () => {
  // const setUserState = useSetRecoilState(userState);
  // const resetUser = useResetRecoilState(resetUserState);
  // const { deleteStorageValue: deleteUserPersistState } =
  //   useLocalStorage<string>({
  //     key: 'userPersistState',
  //   });

  // useEffect(() => {
  //   const updateProfile = async () => {
  //     try {
  //       const profile = await getMemberProfile();
  //       setUserState({ ...profile });
  //     } catch (e) {
  //       resetUser();
  //       deleteUserPersistState();
  //     }
  //   };

  //   if (window.location.pathname.includes('biz')) return;
  //   updateProfile();
  // }, []);

  return (
    <>
      <ErrorBoundary fallback={ErrorPage}>
        <Suspense fallback={<Loading type={'page'} />}>
          <Routes>
            {/*Main*/}
            <Route path={PATH.MAIN} element={<MainPage />} />

            {/*OAuth*/}
            <Route
              path={PATH.OAUTH_SUCCESS}
              element={<ServiceMaintenancePage />}
            />
            {/* <Route path={PATH.OAUTH_SUCCESS} element={<OAuthPage />} /> */}
            <Route
              path={PATH.OAUTH_FAILURE}
              element={<ServiceMaintenancePage />}
            />
            {/* <Route
              path={PATH.OAUTH_FAILURE}
              element={<ErrorPage message={'소셜 로그인에 실패했습니다.'} />}
            /> */}

            <Route element={<GameLayout />}>
              {/*Game*/}
              <Route
                path={PATH.SNACK_GAME}
                element={<ServiceMaintenancePage />}
              />
              {/* <Route path={PATH.SNACK_GAME} element={<SnackGamePage />} /> */}
              <Route
                path={PATH.APPLE_GAME}
                element={<ServiceMaintenancePage />}
              />
              {/* <Route path={PATH.APPLE_GAME} element={<AppleGamePage />} /> */}

              {/*Ranking*/}
              <Route
                path={PATH.SNACK_GAME_RANKING}
                element={<ServiceMaintenancePage />}
              />
              {/* <Route path={PATH.SNACK_GAME_RANKING} element={<RankingPage />} /> */}

              {/* User */}
              <Route path={PATH.USER} element={<ServiceMaintenancePage />} />
              {/* <Route element={<PrivateRoute />}>
                <Route path={PATH.USER} element={<UserPage />} />
              </Route> */}
            </Route>

            <Route>
              {/*Game*/}
              <Route
                path={PATH.SNACK_GAME_BIZ}
                element={<ServiceMaintenancePage />}
              />
              {/* <Route path={PATH.SNACK_GAME_BIZ} element={<SnackGameBizPage />} /> */}
            </Route>

            <Route element={<PrivateRoute />}>
              {/*Setting*/}
              <Route path={PATH.SETTING} element={<ServiceMaintenancePage />} />
              {/* <Route path={PATH.SETTING} element={<SettingPage />} /> */}

              {/* Withdraw */}
              <Route
                path={PATH.WITHDRAW}
                element={<ServiceMaintenancePage />}
              />
              {/* <Route path={PATH.WITHDRAW} element={<WithdrawPage />} /> */}

              {/* Notices */}
              <Route path={PATH.NOTICE} element={<ServiceMaintenancePage />} />
              {/* <Route path={PATH.NOTICE} element={<NoticePage />} /> */}
            </Route>

            {/* Policy */}
            <Route path={PATH.POLICY} element={<ServiceMaintenancePage />} />
            {/* <Route path={PATH.POLICY} element={<PolicyPage />} /> */}

            {/*Error*/}
            <Route
              path={PATH.NOT_FOUND_ERROR}
              element={
                <ErrorPage error={new Error('존재하지 않는 페이지입니다!')} />
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

import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import Auth from '@components/Auth/Auth';
import QueryBoundary from '@components/base/QueryBoundary';
import RetryError from '@components/Error/RetryError';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import Spacing from '@components/Spacing/Spacing';
import UserInfo from '@pages/user/components/UserInfo';
import { userState } from '@utils/atoms/member.atom';

import useModal from '@hooks/useModal';

const UserPage = () => {
  const { openModal } = useModal();
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.id) {
      openModal({
        children: <Auth />,
        handleOutsideClick: () => {
          navigate(-1);
        },
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Snack Game || My Info</title>
      </Helmet>

      {userInfo.id && (
        <div className={'flex flex-col'}>
          <QueryBoundary errorFallback={RetryError}>
            <UserInfo />
          </QueryBoundary>
        </div>
      )}
    </>
  );
};

export default UserPage;

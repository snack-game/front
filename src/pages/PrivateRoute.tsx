import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import Auth from '@components/Auth/Auth';
import { userState } from '@utils/atoms/member.atom';

import PATH from '@constants/path.constant';
import useModal from '@hooks/useModal';

export const PrivateRoute = () => {
  const userInfo = useRecoilValue(userState);

  const { openModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.id) {
      openModal({
        children: <Auth />,
        onClose: () => {
          navigate(PATH.SNACK_GAME, { replace: true });
        },
      });
    }
  }, []);

  if (!userInfo.id) return;
  return <Outlet />;
};

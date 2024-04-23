import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { BottomNav } from '@components/BottomNav/BottomNav';
import { userState } from '@utils/atoms/member.atom';

import PATH from '@constants/path.constant';

const GameLayout = () => {
  const navigate = useNavigate();
  const userStateValue = useRecoilValue(userState);

  useEffect(() => {
    if (!userStateValue.id) {
      navigate(PATH.AUTH, { replace: true });
    }
  }, []);

  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  );
};

export default GameLayout;

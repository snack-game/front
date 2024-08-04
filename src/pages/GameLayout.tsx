import { Outlet, useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import { BottomNav } from '@components/BottomNav/BottomNav';
import { userState } from '@utils/atoms/member.atom';

const GameLayout = () => {
  const navigate = useNavigate();
  const [userStateValue, setUserState] = useRecoilState(userState);

  // useEffect(() => {
  //   const updateProfile = async () => {
  //     const profile = await membersApi.getMemberProfile();
  //     setUserState({ ...profile });
  //   };

  //   if (window.navigator.userAgent.includes('SnackgameApp')) {
  //     updateProfile();
  //     return;
  //   }

  //   if (!userStateValue.id) {
  //     navigate(PATH.AUTH, { replace: true });
  //   }
  // }, []);

  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  );
};

export default GameLayout;

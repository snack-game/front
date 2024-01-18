import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilValue, useResetRecoilState } from 'recoil';

import Auth from '@components/Auth/Auth';
import Button from '@components/Button/Button';
import RouterLink from '@components/RouterLink/RouterLink';
import { resetUserState, userState } from '@utils/atoms/member.atom';

import PATH from '@constants/path.constant';
import useModal from '@hooks/useModal';
import useToast from '@hooks/useToast';

interface HeaderProps {
  className?: string;
  nav?: ReactNode;
}

const Header = ({ nav, className }: HeaderProps) => {
  const { openModal } = useModal();
  const openToast = useToast();
  const resetUser = useResetRecoilState(resetUserState);
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();

  const handleLogin = () => {
    openModal({ children: <Auth /> });
  };

  const handleLogout = () => {
    resetUser();
    openToast('로그아웃 성공!', 'success');
    navigate(PATH.MAIN, { replace: true });
  };

  return (
    <header className={`z-50 w-full bg-white shadow-md ${className}`}>
      <div className={'mx-auto flex h-16 max-w-7xl items-center px-4 lg:px-6'}>
        <RouterLink to={'/'} hover={false} className={'flex flex-1'}>
          <span className={'ml-2 text-2xl text-primary'}>Snack Game</span>
        </RouterLink>

        <nav className={'flex flex-1 justify-center'}>{nav}</nav>

        <div className="flex flex-1 justify-end">
          {userInfo.accessToken ? (
            <div
              className={
                'cursor-pointer text-sm text-primary-deep-dark hover:text-primary hover:underline'
              }
              onClick={handleLogout}
            >
              {userInfo.member.name} 님
            </div>
          ) : (
            <Button onClick={handleLogin}>Login</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

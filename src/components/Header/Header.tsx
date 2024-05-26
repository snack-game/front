import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { twMerge } from 'tailwind-merge';

import authApi from '@api/auth.api';
import Hamburger from '@assets/icon/hamburger.svg?react';
import Auth from '@components/Auth/Auth';
import Button from '@components/Button/Button';
import RouterLink from '@components/RouterLink/RouterLink';
import Spacing from '@components/Spacing/Spacing';
import { resetUserState, userState } from '@utils/atoms/member.atom';

import { LOCAL_STORAGE_KEY } from '@constants/localStorage.constant';
import PATH from '@constants/path.constant';
import useLocalStorage from '@hooks/useLocalStorage';
import useModal from '@hooks/useModal';
import useToast from '@hooks/useToast';

interface HeaderProps {
  className?: string;
  children?: ReactNode;
}

const Header = ({ children, className }: HeaderProps) => {
  const { t } = useTranslation();

  const { openModal } = useModal();
  const openToast = useToast();
  const resetUser = useResetRecoilState(resetUserState);
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const { deleteStorageValue } = useLocalStorage({
    key: LOCAL_STORAGE_KEY.USER_EXPIRE_TIME,
  });

  const handleLogin = () => {
    openModal({
      children: <Auth />,
    });
  };

  const handleLogout = async () => {
    resetUser();
    await authApi.logOut();
    openToast(t('login_logout'), 'success');
    deleteStorageValue();
    navigate(PATH.MAIN, { replace: true });
  };

  const handleOpenToggle = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  return (
    <header className={twMerge('z-50 w-full bg-white shadow-md', className)}>
      <div className="container relative mx-auto flex max-w-7xl flex-col items-center justify-between p-4 lg:flex-row lg:justify-between xl:px-0">
        <div className={'flex w-full items-center justify-between lg:flex-1'}>
          <RouterLink to={'/'} hover={false}>
            <span className={'ml-2 text-2xl text-primary'}>Snack Game</span>
          </RouterLink>

          <Hamburger
            className={'h-6 w-6 text-primary lg:hidden'}
            onClick={handleOpenToggle}
          />
        </div>

        <div className="hidden flex-1 list-none items-center justify-center gap-6 pt-6 lg:flex lg:pt-0">
          {children}
        </div>

        <div className="mr-3 hidden flex-1 items-center justify-end space-x-4 lg:flex">
          {userInfo.id ? (
            <Link
              className={
                'cursor-pointer text-sm text-primary-deep-dark hover:text-primary hover:underline'
              }
              to={PATH.USER}
            >
              {userInfo.name} 님
            </Link>
          ) : (
            <Button onClick={handleLogin}>{t('menu_login')}</Button>
          )}
        </div>

        {isToggleOpen && (
          <motion.div
            className={'w-full lg:w-0'}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
          >
            <Spacing size={2} />
            <div className={'flex flex-col items-start gap-6 px-4 lg:hidden'}>
              {userInfo.id && (
                <Link
                  className={
                    'cursor-pointer font-medium text-gray-400 hover:text-primary hover:underline'
                  }
                  to={PATH.USER}
                >
                  {userInfo.name} 님
                </Link>
              )}

              {children}

              {userInfo.id ? (
                <Button onClick={handleLogout} className={'w-full'}>
                  {t('menu_logout')}
                </Button>
              ) : (
                <Button onClick={handleLogin} className={'w-full'}>
                  {t('menu_login')}
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

interface ListItemProps {
  children: ReactNode;
}

const ListItem = ({ children }: ListItemProps) => {
  return <div>{children}</div>;
};

Header.ListItem = ListItem;

export default Header;

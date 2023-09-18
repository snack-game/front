import { Link } from 'react-router-dom';

import { css } from '@emotion/react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import Button from '@components/common/Button/Button';
import {
  DropDownContainer,
  DropDownItem,
  SideBarContainer,
} from '@components/common/Menu/Menu.style';
import AuthContainer from '@components/ui/AuthForm/AuthContainer';
import { resetUserState, userState } from '@utils/atoms/auth.atom';
import theme from '@utils/theme';

import PATH from '@constants/path.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import { useInternalRouter } from '@hooks/useInternalRouter';
import useModal from '@hooks/useModal';
import useToast from '@hooks/useToast';

const Menu = () => {
  const userInfo = useRecoilValue(userState);
  const resetUser = useResetRecoilState(resetUserState);
  const { openModal } = useModal();
  const { replace } = useInternalRouter();
  const openToast = useToast();

  const handleLogin = () => {
    openModal({ children: <AuthContainer /> });
  };

  const handleLogout = () => {
    resetUser();
    openToast(TOAST_MESSAGE.AUTH_LOGOUT, 'success');
    replace(PATH.HOME);
  };

  return (
    <SideBarContainer>
      <Button
        content={'메뉴'}
        size={'medium'}
        color={theme.colors.lightGreen}
        wrapper={css({ margin: '0.2rem' })}
      />
      <DropDownContainer>
        <Link to={PATH.BLOG}>
          <DropDownItem>블로그</DropDownItem>
        </Link>
        <Link to={PATH.RANKING}>
          <DropDownItem>리더보드</DropDownItem>
        </Link>
        <DropDownItem>
          {userInfo.accessToken ? (
            <div onClick={handleLogout}>로그아웃</div>
          ) : (
            <div onClick={handleLogin}>로그인</div>
          )}
        </DropDownItem>
      </DropDownContainer>
    </SideBarContainer>
  );
};

export default Menu;

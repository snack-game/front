import { Link } from 'react-router-dom';

import { css, useTheme } from '@emotion/react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import LogoImage from '@assets/images/logo.png';
import Button from '@components/common/Button/Button';
import Menu from '@components/common/Menu/Menu';
import { DropDownItem } from '@components/common/Menu/Menu.style';
import ThemeToggle from '@components/common/Toggle/ThemeToggle';
import AuthContainer from '@components/ui/AuthForm/AuthContainer';
import * as Styled from '@components/ui/Header/Header.style';
import { resetUserState, userState } from '@utils/atoms/member.atom';

import PATH from '@constants/path.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import { useInternalRouter } from '@hooks/useInternalRouter';
import useModal from '@hooks/useModal';
import useToast from '@hooks/useToast';

const Header = () => {
  const theme = useTheme();
  const { openModal } = useModal();
  const { replace } = useInternalRouter();
  const openToast = useToast();

  const resetUser = useResetRecoilState(resetUserState);
  const userInfo = useRecoilValue(userState);

  const handleLogin = () => {
    openModal({ children: <AuthContainer /> });
  };

  const handleLogout = () => {
    resetUser();
    console.log('로그아웃');
    openToast(TOAST_MESSAGE.AUTH_LOGOUT, 'success');
    replace(PATH.HOME);
  };

  return (
    <Styled.HeaderContainer>
      <Link to={PATH.HOME}>
        <Styled.Title>
          <img src={LogoImage} alt={'로고 이미지'} />
          <span>Snack Game</span>
        </Styled.Title>
      </Link>

      <Styled.Nav>
        <Link to={PATH.APPLE_GAME}>게임</Link>
        <Link to={PATH.RANKING}>랭킹</Link>
        <Link to={PATH.BLOG}>블로그</Link>
        <Link to={PATH.TEAM}>팀 소개</Link>
      </Styled.Nav>

      <Styled.Options>
        <ThemeToggle />
        {userInfo.accessToken ? (
          <>
            <Styled.Desktop>
              <Menu buttonContent={userInfo.name + ' 님'}>
                <DropDownItem onClick={handleLogout}>로그아웃</DropDownItem>
              </Menu>
            </Styled.Desktop>
            <Styled.Mobile>
              <Menu buttonContent={userInfo.name + ' 님'}>
                <DropDownItem>
                  <Link to={PATH.APPLE_GAME}>게임</Link>
                </DropDownItem>
                <DropDownItem>
                  <Link to={PATH.RANKING}>랭킹</Link>
                </DropDownItem>
                <DropDownItem>
                  <Link to={PATH.BLOG}>블로그</Link>
                </DropDownItem>
                <DropDownItem>
                  <Link to={PATH.TEAM}>팀 소개</Link>
                </DropDownItem>
                <DropDownItem onClick={handleLogout}>로그아웃</DropDownItem>
              </Menu>
            </Styled.Mobile>
          </>
        ) : (
          <Button
            content={'로그인'}
            size={'small'}
            color={theme.colors.lightGreen}
            wrapper={css({ margin: '0.2rem' })}
            onClick={handleLogin}
          />
        )}
      </Styled.Options>
    </Styled.HeaderContainer>
  );
};

export default Header;

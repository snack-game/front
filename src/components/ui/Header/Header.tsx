import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { css, useTheme } from '@emotion/react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import LINK from '@assets/images/link.png';
import LogoImage from '@assets/images/logo.png';
import Button from '@components/common/Button/Button';
import LangSelect from '@components/common/Lang/LangSelect';
import Menu from '@components/common/Menu/Menu';
import { DropDownItem } from '@components/common/Menu/Menu.style';
import ThemeToggle from '@components/common/Toggle/ThemeToggle';
import AuthContainer from '@components/ui/AuthForm/AuthContainer';
import * as Styled from '@components/ui/Header/Header.style';
import { NavItemBlog } from '@components/ui/Header/Header.style';
import { resetUserState, userState } from '@utils/atoms/member.atom';

import PATH from '@constants/path.constant';
import useModal from '@hooks/useModal';
import useToast from '@hooks/useToast';

const Header = () => {
  const theme = useTheme();
  const { openModal } = useModal();
  const openToast = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const resetUser = useResetRecoilState(resetUserState);
  const userInfo = useRecoilValue(userState);

  const handleLogin = () => {
    openModal({ children: <AuthContainer /> });
  };

  const handleLogout = () => {
    resetUser();
    openToast(t('login_logout'), 'success');
    navigate(PATH.HOME, { replace: true });
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
        <Link to={PATH.APPLE_GAME}>{t('nav_game')}</Link>
        <Link to={PATH.RANKING}>{t('nav_rank')}</Link>
        <Link to={PATH.BLOG} target="_blank">
          <NavItemBlog>
            {t('nav_blog')}
            <img src={LINK} alt={'블로그'} />
          </NavItemBlog>
        </Link>
        <Link to={PATH.TEAM}>{t('nav_team')}</Link>
      </Styled.Nav>

      <Styled.Options>
        <ThemeToggle />
        <LangSelect />
        {userInfo.accessToken ? (
          <>
            <Styled.Desktop>
              <Menu buttonContent={userInfo.member.name}>
                <Link to={PATH.USER}>
                  <DropDownItem>{t('menu_my_info')}</DropDownItem>
                </Link>
                <DropDownItem onClick={handleLogout}>
                  {t('menu_logout')}
                </DropDownItem>
              </Menu>
            </Styled.Desktop>
            <Styled.Mobile>
              <Menu buttonContent={userInfo.member.name}>
                <Link to={PATH.USER}>
                  <DropDownItem>{t('menu_my_info')}</DropDownItem>
                </Link>
                <Link to={PATH.APPLE_GAME}>
                  <DropDownItem>{t('nav_game')}</DropDownItem>
                </Link>
                <Link to={PATH.RANKING}>
                  <DropDownItem>{t('nav_rank')}</DropDownItem>
                </Link>
                <Link to={PATH.BLOG} target="_blank">
                  <NavItemBlog>
                    <DropDownItem>{t('nav_blog')}</DropDownItem>
                  </NavItemBlog>
                </Link>
                <Link to={PATH.TEAM}>
                  <DropDownItem>{t('nav_team')}</DropDownItem>
                </Link>
                <DropDownItem onClick={handleLogout}>
                  {t('menu_logout')}
                </DropDownItem>
              </Menu>
            </Styled.Mobile>
          </>
        ) : (
          <>
            <Styled.Desktop>
              <Button
                content={t('menu_login')}
                size={'small'}
                color={theme.colors.lightGreen}
                wrapper={css({ margin: '0.2rem' })}
                onClick={handleLogin}
              />
            </Styled.Desktop>
            <Styled.Mobile>
              <Menu buttonContent={t('menu')}>
                <DropDownItem onClick={handleLogin}>
                  {t('menu_login')}
                </DropDownItem>
                <Link to={PATH.APPLE_GAME}>
                  <DropDownItem>{t('nav_game')}</DropDownItem>
                </Link>
                <Link to={PATH.RANKING}>
                  <DropDownItem>{t('nav_rank')}</DropDownItem>
                </Link>
                <Link to={PATH.BLOG} target="_blank">
                  <NavItemBlog>
                    <DropDownItem>{t('nav_blog')}</DropDownItem>
                  </NavItemBlog>
                </Link>
                <Link to={PATH.TEAM}>
                  <DropDownItem>{t('nav_team')}</DropDownItem>
                </Link>
              </Menu>
            </Styled.Mobile>
          </>
        )}
      </Styled.Options>
    </Styled.HeaderContainer>
  );
};

export default Header;

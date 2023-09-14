import { Link } from 'react-router-dom';

import { css } from '@emotion/react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import LogoImage from '@assets/images/logo.png';
import Button from '@components/common/Button/Button';
import * as Styled from '@components/ui/Header/Header.style';
import { resetUserState, userState } from '@utils/atoms/auth';
import theme from '@utils/theme';

import PATH from '@constants/path.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import { useInternalRouter } from '@hooks/useInternalRouter';
import useToast from '@hooks/useToast';

const Header = () => {
  const userInfo = useRecoilValue(userState);
  const resetUser = useResetRecoilState(resetUserState);
  const { replace } = useInternalRouter();
  const openToast = useToast();

  const handleLogout = () => {
    resetUser();
    openToast(TOAST_MESSAGE.AUTH_LOGOUT, 'success');
    replace(PATH.HOME);
  };

  return (
    <Styled.HeaderContainer>
      <Styled.Title href={PATH.HOME}>
        <img src={LogoImage} alt={'로고 이미지'} />
        <span>Snack Game</span>
      </Styled.Title>
      <Styled.Nav>
        <Link to={PATH.BLOG}>
          <Button
            content={'블로그'}
            size={'small'}
            color={theme.colors.primaryButton}
          />
        </Link>
        <Link to={PATH.RANKING}>
          <Button
            content={'리더보드'}
            size={'small'}
            color={theme.colors.darkYellow}
          />
        </Link>
        {userInfo.accessToken ? (
          <>
            {userInfo.name} 님
            <Button
              wrapper={css({ marginLeft: '0.5rem' })}
              content={'로그아웃'}
              size={'small'}
              onClick={handleLogout}
              color={theme.colors.darkBrown}
            />
          </>
        ) : (
          <>
            <Link to={PATH.AUTH}>
              <Button
                content={'로그인!'}
                size={'small'}
                color={theme.colors.lightGreen}
              />
            </Link>
          </>
        )}
      </Styled.Nav>
    </Styled.HeaderContainer>
  );
};

export default Header;

import { Link } from 'react-router-dom';

import { useRecoilValue, useResetRecoilState } from 'recoil';

import LogoImage from '@assets/images/logo.png';
import Button from '@components/common/Button/Button';
import * as Styled from '@components/ui/Header/Header.style';
import { resetUserState, userState } from '@utils/atoms/auth';
import theme from '@utils/theme';

import PATH from '@constants/path.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import useToast from '@hooks/useToast';

const Header = () => {
  const userInfo = useRecoilValue(userState);
  const resetUser = useResetRecoilState(resetUserState);
  const openToast = useToast();

  return (
    <Styled.HeaderContainer>
      <Styled.Title href={PATH.HOME}>
        <img src={LogoImage} alt={'로고 이미지'} />
        <span>Snack Game</span>
      </Styled.Title>
      <Styled.Nav>
        <Link to={PATH.BOARD}>
          <Button content={'리더보드'} size={'small'} />
        </Link>
        {userInfo.accessToken ? (
          <>
            {userInfo.name} 님{' '}
            <Button
              content={'로그아웃'}
              size={'small'}
              onClick={() => {
                resetUser();
                openToast(TOAST_MESSAGE.AUTH_LOGOUT, 'success');
              }}
            />
          </>
        ) : (
          <>
            <Link to={PATH.AUTH}>
              <Button
                content={'랭킹 등록하기!'}
                size={'small'}
                color={theme.colors.background}
                text={'black'}
                border={true}
              />
            </Link>
          </>
        )}
      </Styled.Nav>
    </Styled.HeaderContainer>
  );
};

export default Header;

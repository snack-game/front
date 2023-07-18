import { Link } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import LogoImage from '@assets/images/logo.png';
import * as Styled from '@components/ui/Header/Header.style';
import { userState } from '@utils/atoms/auth';

import PATH from '@constants/path.constant';

const Header = () => {
  const userInfo = useRecoilValue(userState);

  return (
    <Styled.HeaderWrapper>
      <Styled.Title href={PATH.HOME}>
        <img src={LogoImage} alt={'로고 이미지'} />
        <span>Snack Game</span>
      </Styled.Title>
      {userInfo.accessToken ? (
        <Styled.Nav>{userInfo.name} 님</Styled.Nav>
      ) : (
        <Styled.Nav>
          <Link to={PATH.LOGIN}>로그인 </Link>
          <Link to={PATH.REGISTER}>회원가입 </Link>
        </Styled.Nav>
      )}
    </Styled.HeaderWrapper>
  );
};

export default Header;

import { Link } from 'react-router-dom';

import LogoImage from '@assets/images/logo.png';
import * as Styled from '@components/ui/Header/Header.style';

const Header = () => {
  return (
    <Styled.HeaderWrapper>
      <Styled.Title href={'/'}>
        <img src={LogoImage} alt={'로고 이미지'} />
        <span>Snack Game</span>
      </Styled.Title>
      <Styled.Nav>
        <Link to={'/login'}>로그인 </Link>
        <Link to={'/register'}>회원가입 </Link>
      </Styled.Nav>
    </Styled.HeaderWrapper>
  );
};

export default Header;

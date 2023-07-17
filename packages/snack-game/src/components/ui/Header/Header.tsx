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
        <Link to={'/auth'}>로그인 </Link>
      </Styled.Nav>
    </Styled.HeaderWrapper>
  );
};

export default Header;

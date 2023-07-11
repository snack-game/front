import { FC } from 'react';

import LogoImage from '@assets/images/logo.png';
import * as Styled from '@components/ui/Header/Header.style';

interface HeaderProps {
  children?: never;
}

const Header: FC<HeaderProps> = () => {
  return (
    <Styled.HeaderWrapper>
      <Styled.Title href={'/'}>
        <img src={LogoImage} alt={'로고 이미지'} />
        <span>Snack Game</span>
      </Styled.Title>
      <Styled.Nav>
        <Styled.Nav>로그인</Styled.Nav>
      </Styled.Nav>
    </Styled.HeaderWrapper>
  );
};

export default Header;

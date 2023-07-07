import { FC } from 'react';

import styled from '@emotion/styled';

import LogoImage from '@assets/images/logo.png';

interface HeaderProps {
  children?: never;
}

const StyledHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 1.25rem;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const StyledTitle = styled.a`
  display: flex;
  margin-bottom: 1rem;
  color: #111827;
  font-weight: 500;
  align-items: center;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }

  & > span {
    margin-left: 0.75rem;
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  & > img {
    width: 2rem;
    height: 2rem;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  font-size: 1rem;
  line-height: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    margin-left: auto;
  }

  & > a {
    margin-right: 1.25rem;

    :hover {
      color: #111827;
    }
  }
`;

const Header: FC<HeaderProps> = () => {
  return (
    <StyledHeaderWrapper>
      <StyledTitle href={'/'}>
        <img src={LogoImage} alt={'로고 이미지'} />
        <span>Snack Game</span>
      </StyledTitle>
      <StyledNav>
        <StyledNav>로그인</StyledNav>
      </StyledNav>
    </StyledHeaderWrapper>
  );
};

export default Header;

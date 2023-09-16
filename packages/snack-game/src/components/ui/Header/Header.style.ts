import styled from '@emotion/styled';

import theme from '@utils/theme';

export const HeaderContainer = styled.div`
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

export const Title = styled.a`
  display: flex;
  margin-bottom: 1rem;
  color: ${theme.colors.titleText};
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

export const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    margin-left: auto;
  }

  & > a {
    margin-right: 2rem;
  }
`;

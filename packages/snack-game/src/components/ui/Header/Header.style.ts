import styled from '@emotion/styled';

import theme from '@utils/theme';

export const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  padding: 1.25rem;
  margin-left: auto;
  margin-right: auto;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  justify-items: center;
`;

export const Title = styled.div`
  display: flex;
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
  gap: 1.5rem;

  @media (min-width: 768px) {
    margin-left: auto;
  }

  & > p {
    font-size: 1.25rem;
  }
`;

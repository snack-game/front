import styled from '@emotion/styled';

export const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  padding: 1.25rem;
  margin-left: auto;
  margin-right: auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  justify-items: center;
`;

export const Title = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.titleText};
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
  justify-content: center;
  align-items: center;
  gap: 4rem;
  color: ${(props) => props.theme.colors.titleText};
  font-size: 1rem;

  & > a:hover {
    color: ${(props) => props.theme.colors.description};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Options = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

export const Desktop = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Mobile = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

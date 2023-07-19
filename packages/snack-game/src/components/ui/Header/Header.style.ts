import styled from '@emotion/styled';

export const HeaderWrapper = styled.div`
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

export const Nav = styled.nav`
  display: flex;
  line-height: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    margin-left: auto;
  }

  & > a {
    margin-right: 2rem;
    font-size: 1rem;

    :hover {
      color: #f97316;
    }
  }
`;

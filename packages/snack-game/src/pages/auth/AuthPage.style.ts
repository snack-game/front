import styled from '@emotion/styled';

import theme from '@utils/theme';

export const Container = styled.div`
  display: flex;
  padding: 3rem 1.25rem;
  flex-wrap: wrap;
  align-items: center;
`;

export const TextContainer = styled.div`
  padding-right: 0;

  @media (min-width: 768px) {
    padding-right: 4rem;
    width: 50%;
  }
  @media (min-width: 1024px) {
    padding-right: 0;
    width: 60%;
  }
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 500;
  color: ${theme.colors.titleText};
`;

export const Description = styled.p`
  margin-top: 1rem;
  line-height: 1.625;
  color: ${theme.colors.description};
`;

export const AuthTypeContainer = styled.div`
  width: fit-content;
  margin: 6rem auto 0 auto;
`;

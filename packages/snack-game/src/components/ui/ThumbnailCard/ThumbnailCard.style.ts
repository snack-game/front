import styled from '@emotion/styled';

import theme from '@utils/theme';

export const Wrapper = styled.div`
  display: flex;
  margin: -1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Inner = styled.div`
  overflow: hidden;
  padding: 1rem;
  height: 100%;
  width: 70%;
  border: 2px solid ${theme.colors.boxBorder};
  border-radius: 0.5rem;
`;

export const Thumbnail = styled.img`
  object-fit: cover;
  object-position: center;
  width: 100%;

  @media (min-width: 768px) {
    height: 9rem;
  }
`;

export const Contents = styled.div`
  background-color: ${theme.colors.background};
  padding: 1.5rem;
`;

export const Title = styled.h1`
  margin-bottom: 0.75rem;
  color: ${theme.colors.titleText};
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
`;

export const Description = styled.p`
  margin-bottom: 0.75rem;
  line-height: 1.625;
  white-space: pre-line;
`;

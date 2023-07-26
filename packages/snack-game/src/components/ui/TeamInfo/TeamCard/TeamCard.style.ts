import styled from '@emotion/styled';

import theme from '@utils/theme';

export const Wrapper = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  height: 100%;

  padding: 1rem;

  @media (min-width: 768px) {
    width: 50%;
  }
  @media (min-width: 1024px) {
    width: 300px;
  }
`;

export const Thumbnail = styled.img`
  object-fit: cover;
  object-position: center;
  margin-bottom: 1rem;
  flex-shrink: 0;
  width: 100%;
  height: 14rem;
  border-radius: 0.5rem;
`;

export const Contents = styled.div`
  width: 100%;
`;

export const Name = styled.h2`
  color: ${theme.colors.titleText};
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
`;

export const Position = styled.h3`
  margin-bottom: 0.75rem;
  color: ${theme.colors.description};
`;

export const Intro = styled.span`
  display: block;
  color: ${theme.colors.description};
  white-space: pre-line;
`;

export const GithubIcon = styled.svg`
  width: 2.5rem;
  height: 2rem;
  margin: 1rem auto auto;
`;

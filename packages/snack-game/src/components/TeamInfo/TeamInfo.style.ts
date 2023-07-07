import styled from '@emotion/styled';

export const Wrapper = styled.div`
  padding: 6rem 1.25rem 3rem;
  margin-left: auto;
  margin-right: auto;
`;

export const Title = styled.div`
  display: flex;
  margin-bottom: 2.5rem;
  text-align: center;
  flex-direction: column;
  width: 100%;

  color: #111827;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 500;
`;

export const TeamInfoWrapper = styled.div`
  display: flex;
  margin: -1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const TeamInfoInner = styled.div`
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

export const TeamInfoThumbnail = styled.img`
  object-fit: cover;
  object-position: center;
  margin-bottom: 1rem;
  flex-shrink: 0;
  width: 100%;
  height: 14rem;
  border-radius: 0.5rem;
`;

export const TeamInfo = styled.div`
  width: 100%;
`;

export const Name = styled.h2`
  color: #111827;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
`;

export const Position = styled.h3`
  margin-bottom: 0.75rem;
  color: #6b7280;
`;

export const Intro = styled.span`
  display: inline-flex;
  color: #6b7280;
  white-space: pre-line;
`;

export const GithubIcon = styled.svg`
  width: 2.5rem;
  height: 2rem;
  margin: 1rem auto auto;
`;

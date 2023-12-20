import styled from '@emotion/styled';

export const AppleGameTutorialContainer = styled.div`
  width: fit-content;
  margin: 1rem auto 0 auto;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  text-align: start;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.titleText};
`;

export const Description = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
  white-space: pre-wrap;
  color: ${(props) => props.theme.colors.description};
`;

export const TutorialNav = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ImageContainer = styled.div`
  margin: auto;
  display: flex;
  width: 220px;
  height: 220px;
  justify-content: center;

  & > img {
    margin: auto;
    max-width: 220px;
  }
`;

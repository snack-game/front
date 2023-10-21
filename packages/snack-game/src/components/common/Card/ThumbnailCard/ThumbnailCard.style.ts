import styled from '@emotion/styled';

export const ThumbnailCardContainer = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.colors.boxBorder};
  width: 30%;
  margin: auto;
  height: fit-content;
  align-items: center;
  text-align: center;
  min-width: 225px;
`;

export const Thumbnail = styled.div`
  display: inline-flex;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  padding: 1rem;

  & > img {
    width: 5rem;
  }
`;

export const Info = styled.div`
  flex-grow: 1;
  white-space: pre-wrap;
  color: ${(props) => props.theme.colors.orange};

  & > h2 {
    margin-bottom: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.titleText};
  }

  & > p {
    font-size: 1rem;
    line-height: 1.5rem;
    margin-top: 0.25rem;
  }

  & > span {
    color: ${(props) => props.theme.colors.description};
  }
`;

import styled from '@emotion/styled';

export const ThumbnailCardContainer = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.colors.boxBorder};
  width: 60%;
  margin: auto;
  height: fit-content;
  align-items: center;

  @media (min-width: 640px) {
    flex-direction: row;
    width: 100%;
  }
`;

export const Thumbnail = styled.div`
  display: inline-flex;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  padding: 1rem;

  @media (min-width: 640px) {
    margin-bottom: 0;
    margin-right: 2rem;
  }

  & > img {
    width: 4rem;
  }
`;

export const Info = styled.div`
  flex-grow: 1;
  white-space: pre-wrap;

  & > h2 {
    margin-bottom: 0.75rem;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 500;
    color: #111827;
  }

  & > p {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

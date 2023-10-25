import styled from '@emotion/styled';

export const AppleGamePageContainer = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  color: #4b5563;
  justify-content: center;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 6rem 6rem 3rem 6rem;
  }
`;

export const AppleGamePageLeft = styled.div`
  margin-bottom: 2.5rem;
  width: 100%;

  @media (min-width: 1024px) {
    max-width: 30rem;
  }
`;

export const AppleGamePageRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    padding-left: 4rem;
    align-items: flex-start;
    text-align: left;
  }

  & > h1 {
    margin-bottom: 1rem;
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.titleText};

    @media (min-width: 640px) {
      font-size: 2.25rem;
      line-height: 2.5rem;
    }
  }

  & > p {
    margin-bottom: 2rem;
    line-height: 1.625;
    color: ${(props) => props.theme.colors.description};
  }
`;

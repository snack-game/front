import styled from '@emotion/styled';

export const UserRankingCardWrapper = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  margin: auto;
  bottom: 0.5rem;
  padding: 1.5rem;
  border: 1px solid;
  border-color: ${(props) => props.theme.colors.orange};
  border-radius: 1rem;
  color: ${(props) => props.theme.colors.titleText};
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
`;

export const UserRankingCardItem = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  & > span {
    color: ${(props) => props.theme.colors.orange};
  }
`;

import styled from '@emotion/styled';

import { useGetUserRanking } from '@hooks/queries/ranking.query';

const UserRankingCardWrapper = styled.div`
  position: fixed;
  width: 70%;
  margin: auto;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 1.5rem;
  border: 1px solid;
  border-color: ${(props) => props.theme.colors.orange};
  border-radius: 1rem;
  color: ${(props) => props.theme.colors.titleText};
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
`;

const UserRankingCardItem = styled.div`
  display: flex;
  justify-content: space-around;
`;

const UserRankingCard = () => {
  const userRanking = useGetUserRanking();

  return (
    <>
      {userRanking?.ranking && (
        <UserRankingCardWrapper>
          <UserRankingCardItem>
            <p>{userRanking.owner.name}님</p>
            <p>랭킹 {userRanking.ranking}등!</p>
            <p>점수 {userRanking.score}점!</p>
          </UserRankingCardItem>
        </UserRankingCardWrapper>
      )}
    </>
  );
};

export default UserRankingCard;

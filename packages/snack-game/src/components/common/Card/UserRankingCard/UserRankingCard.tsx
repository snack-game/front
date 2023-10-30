import * as Styled from '@components/common/Card/UserRankingCard/UserRankingCard.style';

import { useGetUserRanking } from '@hooks/queries/ranking.query';

const UserRankingCard = () => {
  const userRanking = useGetUserRanking();

  return (
    <>
      {userRanking?.ranking && (
        <Styled.UserRankingCardWrapper>
          <Styled.UserRankingCardItem>
            <p>{userRanking.owner.name}님</p>
            <p>{userRanking.owner.group?.name || '그룹없음'}</p>
            <span>랭킹 {userRanking.ranking}등!</span>
            <span>점수 {userRanking.score}점!</span>
          </Styled.UserRankingCardItem>
        </Styled.UserRankingCardWrapper>
      )}
    </>
  );
};

export default UserRankingCard;

import styled from '@emotion/styled';

import PersonImage from '@assets/images/person.png';
import ThumbnailCard from '@components/common/Card/ThumbnailCard/ThumbnailCard';

import { useGetUserRanking } from '@hooks/queries/ranking.query';

const UserRankingCardContainer = styled.div`
  width: 100%;

  @media (min-width: 640px) {
    width: 40%;
  }
`;

const UserRankingCard = () => {
  const userRanking = useGetUserRanking();

  return (
    <>
      {userRanking?.ranking && (
        <UserRankingCardContainer>
          <ThumbnailCard
            imgSrc={PersonImage}
            title={userRanking?.owner.name + ' 님'}
            content={
              '최고점수: ' +
              userRanking?.score +
              '점!\n' +
              '랭킹: ' +
              userRanking?.ranking +
              '위!'
            }
          ></ThumbnailCard>
        </UserRankingCardContainer>
      )}
    </>
  );
};

export default UserRankingCard;

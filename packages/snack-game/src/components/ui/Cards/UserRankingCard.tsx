import styled from '@emotion/styled';

import PersonImage from '@assets/images/person.png';
import ThumbnailCard from '@components/common/Card/ThumbnailCard/ThumbnailCard';
import Loading from '@components/common/Loading';

import { useGetUserRanking } from '@hooks/queries/ranking.query';

const UserRankingCardContainer = styled.div`
  width: 100%;

  @media (min-width: 640px) {
    width: 40%;
  }
`;

const UserRankingCard = () => {
  const { isLoading, data } = useGetUserRanking();

  return (
    <UserRankingCardContainer>
      {isLoading ? (
        <Loading />
      ) : (
        <ThumbnailCard
          imgSrc={PersonImage}
          title={data?.owner.name + ' 님'}
          content={
            '최고점수: ' +
            data?.score +
            '점!\n' +
            '랭킹: ' +
            data?.ranking +
            '위!'
          }
        ></ThumbnailCard>
      )}
    </UserRankingCardContainer>
  );
};

export default UserRankingCard;

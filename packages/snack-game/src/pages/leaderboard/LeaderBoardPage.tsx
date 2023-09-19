import { Helmet } from 'react-helmet-async';

import styled from '@emotion/styled';

import PageContainer from '@components/base/PageContainer';
import QueryBoundary from '@components/base/QueryBoundary';
import RetryError from '@components/common/Error/RetryError';
import UserRankingCard from '@components/ui/Cards/UserRankingCard';
import RankingTable from '@components/ui/RankingTable/RankingTable';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const LeaderBoardPage = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Board</title>
      </Helmet>
      <PageContainer>
        <ContentContainer>
          <QueryBoundary errorFallback={RetryError}>
            <UserRankingCard />
          </QueryBoundary>
          <QueryBoundary errorFallback={RetryError}>
            <RankingTable />
          </QueryBoundary>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default LeaderBoardPage;

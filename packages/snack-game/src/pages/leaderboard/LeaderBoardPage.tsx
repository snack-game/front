import { Helmet } from 'react-helmet-async';

import styled from '@emotion/styled';

import ErrorBoundary from '@components/base/ErrorBoundary';
import PageContainer from '@components/base/PageContainer';
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
          <ErrorBoundary fallback={RetryError}>
            <UserRankingCard />
          </ErrorBoundary>
          <ErrorBoundary fallback={RetryError}>
            <RankingTable />
          </ErrorBoundary>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default LeaderBoardPage;

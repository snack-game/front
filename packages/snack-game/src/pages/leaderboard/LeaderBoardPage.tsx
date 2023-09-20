import { Helmet } from 'react-helmet-async';

import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import PageContainer from '@components/base/PageContainer';
import QueryBoundary from '@components/base/QueryBoundary';
import RetryError from '@components/common/Error/RetryError';
import UserRankingCard from '@components/ui/Cards/UserRankingCard';
import RankingTable from '@components/ui/RankingTable/RankingTable';
import { userState } from '@utils/atoms/auth.atom';

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
  const userStateValue = useRecoilValue(userState);
  return (
    <>
      <Helmet>
        <title>Snack Game || Board</title>
      </Helmet>
      <PageContainer>
        <ContentContainer>
          {userStateValue.accessToken && (
            <QueryBoundary errorFallback={RetryError}>
              <UserRankingCard />
            </QueryBoundary>
          )}
          <QueryBoundary errorFallback={RetryError}>
            <RankingTable />
          </QueryBoundary>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default LeaderBoardPage;
